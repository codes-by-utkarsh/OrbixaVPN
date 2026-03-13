import { Client } from 'ssh2';
import Server from '../models/Server';

const normalizePrivateKey = (key: string) => {
    if (!key) return undefined;

    // Step 1: Replace literal "\n" strings with actual newlines
    let normalized = key.replace(/\\n/g, '\n').trim();

    // Step 2: If it's a single line but contains the standard headers, we need to re-wrap it
    if (!normalized.includes('\n') && normalized.startsWith('-----')) {
        const match = normalized.match(/(-----BEGIN [^-]+-----)(.*?)(-----END [^-]+-----)/);
        if (match) {
            const [_, header, content, footer] = match;
            // Re-wrap the base64 content every 64 characters
            const wrappedContent = content.trim().match(/.{1,64}/g)?.join('\n');
            normalized = `${header}\n${wrappedContent}\n${footer}`;
        }
    }

    return normalized;
};

export const syncUserToNode = (userUuid: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(`Starting SSH sync for user: ${userUuid}`);
            const server = await Server.findOne({ status: 'online' });

            if (!server || !server.sshHost) {
                console.warn('SSH Sync: No active server with credentials found in DB.');
                return resolve(); // Resolve but warn
            }

            const pKey = server.sshKey ? normalizePrivateKey(server.sshKey as string) : undefined;
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
                        // stdout ignored for success
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
                privateKey: pKey,
                readyTimeout: 30000
            });

        } catch (err) {
            console.error('Fatal SSH Sync Error:', err);
            reject(err);
        }
    });
};
