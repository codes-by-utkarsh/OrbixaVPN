import { Client } from 'ssh2';
import Server from '../models/Server';

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

export const syncUserToNode = (userUuid: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            const server = await Server.findOne({ status: 'online' });
            if (!server || !server.sshHost) return resolve();

            const pKey = server.sshKey ? normalizePrivateKey(server.sshKey as string) : undefined;
            const conn = new Client();

            conn.on('ready', () => {
                // Direct command logic to "Upsert" user WITHOUT breaking flow/ws compatibility
                // It checks if ID exists; if yes, does nothing. If no, appends fresh client.
                const command = `
                    if ! command -v jq &> /dev/null; then sudo apt update && sudo apt install -y jq; fi
                    sudo cp /usr/local/etc/xray/config.json /usr/local/etc/xray/config.json.bak
                    sudo jq --arg uuid "${userUuid}" '
                        if .inbounds[0].settings.clients | any(.id == $uuid) 
                        then . 
                        else .inbounds[0].settings.clients += [{"id": $uuid}] 
                        end
                    ' /usr/local/etc/xray/config.json > /tmp/xray.json && \
                    sudo mv /tmp/xray.json /usr/local/etc/xray/config.json && \
                    sudo systemctl restart xray
                `;

                conn.exec(command, (err, stream) => {
                    if (err) { conn.end(); return reject(err); }
                    stream.on('close', (code: number) => {
                        console.log(`SSH Command exited with code ${code}`);
                        conn.end();
                        if (code === 0) resolve();
                        else reject(new Error(`SSH Command failed with code ${code}`));
                    }).on('data', (data: any) => {
                        console.log(`SSH Stdout: ${data}`);
                    }).stderr.on('data', (d: any) => {
                        console.error(`SSH Stderr: ${d}`);
                    });
                });
            }).on('error', (err) => reject(err)).connect({
                host: server.sshHost,
                username: server.sshUser || 'ubuntu',
                privateKey: pKey,
                readyTimeout: 30000
            });
        } catch (err) { reject(err); }
    });
};
