import { Client } from 'ssh2';
import Server from '../models/Server';

export const syncUserToNode = (userUuid: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(`Starting SSH sync for user: ${userUuid}`);
            const server = await Server.findOne({ status: 'online' });

            if (!server || !server.sshHost) {
                console.warn('SSH Sync: No active server with credentials found in DB.');
                return resolve(); // Resolve but warn
            }

            console.log(`Connecting to SSH: ${server.sshUser}@${server.sshHost}`);
            const conn = new Client();

            conn.on('ready', () => {
                console.log('✅ SSH Connection established');
                // The script must be executable on the server
                const command = `sudo /usr/local/bin/add_user.sh ${userUuid}`;

                conn.exec(command, (err, stream) => {
                    if (err) {
                        console.error('SSH Exec Error:', err);
                        conn.end();
                        return reject(err);
                    }

                    let stdout = '';
                    let stderr = '';

                    stream.on('close', (code: number) => {
                        console.log(`SSH Command exited with code ${code}`);
                        conn.end();
                        if (code === 0) {
                            resolve();
                        } else {
                            reject(new Error(`Command failed with code ${code}: ${stderr}`));
                        }
                    }).on('data', (data: any) => {
                        stdout += data;
                    }).stderr.on('data', (data: any) => {
                        stderr += data;
                    });
                });
            }).on('error', (err) => {
                console.error('❌ SSH Connection Error:', err);
                reject(err);
            }).connect({
                host: server.sshHost,
                port: 22,
                username: server.sshUser || 'ubuntu',
                password: server.sshPassword as any,
                privateKey: server.sshKey ? server.sshKey.replace(/\\n/g, '\n').trim() : undefined,
                readyTimeout: 20000 // 20 seconds timeout
            });

        } catch (err) {
            console.error('Fatal SSH Sync Error:', err);
            reject(err);
        }
    });
};
