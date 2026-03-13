import mongoose from 'mongoose';
import { Client } from 'ssh2';
import * as dotenv from 'dotenv';
import path from 'path';
import Server from './models/Server';

dotenv.config({ path: path.join(__dirname, '../.env') });

const UUID_TO_REMOVE = "2e9dc8f5-73b7-4bc9-8b74-c4e0f7019563";

const normalizePrivateKey = (key: string) => {
    if (!key) return undefined;
    let cleaned = key.replace(/\\n/g, '\n').trim();
    if (cleaned.startsWith('-----BEGIN') && !cleaned.includes('\n', 30)) {
        const headerMatch = cleaned.match(/^(-----BEGIN [^-]+-----)(.*)(-----END [^-]+-----)$/);
        if (headerMatch) {
            const [_, header, body, footer] = headerMatch;
            const cleanBody = body.replace(/\s/g, '');
            const wrappedBody = cleanBody.match(/.{1,64}/g)?.join('\n');
            return `${header}\n${wrappedBody}\n${footer}\n`;
        }
    }
    return cleaned.endsWith('\n') ? cleaned : cleaned + '\n';
};

async function run() {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI!);

        const server = await Server.findOne({ status: 'online' }).select('+sshKey +sshPassword');
        if (!server) {
            console.error('❌ No online server found');
            process.exit(1);
        }

        console.log(`📡 Connecting to SSH: ${server.sshUser}@${server.sshHost}...`);
        const pKey = normalizePrivateKey(server.sshKey as string);
        const conn = new Client();

        conn.on('ready', () => {
            console.log('✅ SSH Connection Ready');
            const command = `
                # 1. Force install jq if missing
                if ! command -v jq &> /dev/null; then sudo apt-get update && sudo apt-get install -y jq; fi
                
                # 2. Remove user and clean config
                sudo jq --arg uuid "${UUID_TO_REMOVE}" 'del(.inbounds[0].settings.clients[] | select(.id == $uuid)) | del(.. | .flow?)' /usr/local/etc/xray/config.json > /tmp/xray_temp.json
                
                # 3. Move the file into place
                sudo mv /tmp/xray_temp.json /usr/local/etc/xray/config.json
                
                # 4. Restart services
                sudo systemctl restart xray
                
                echo "SUCCESS_REMOVED_${UUID_TO_REMOVE}"
            `;

            conn.exec(command, (err, stream) => {
                if (err) { console.error('❌ Exec Error:', err); conn.end(); process.exit(1); }
                stream.on('close', (code: number) => {
                    console.log(`SSH Command exited with code ${code}`);
                    conn.end();
                    mongoose.disconnect();
                    if (code === 0) console.log('🎯 Successfully removed user from server.');
                    else console.error('❌ Server command failed.');
                    process.exit(code);
                }).on('data', (data: any) => {
                    console.log(`STDOUT: ${data}`);
                }).stderr.on('data', (d: any) => {
                    console.error(`STDERR: ${d}`);
                });
            });
        }).on('error', (err) => {
            console.error('❌ SSH Connection Error:', err);
            mongoose.disconnect();
            process.exit(1);
        }).connect({
            host: server.sshHost,
            username: server.sshUser || 'ubuntu',
            privateKey: pKey,
            readyTimeout: 30000
        });
    } catch (err) {
        console.error('❌ Script Error:', err);
        process.exit(1);
    }
}

run();
