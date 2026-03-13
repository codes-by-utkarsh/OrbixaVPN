import { Client } from 'ssh2';
import Server from '../models/Server';

const normalizePrivateKey = (key: string) => {
    if (!key) return undefined;

    // Step 1: Clean basic whitespace and handle literal "\n" strings
    let cleaned = key.replace(/\\n/g, '\n').trim();

    // Step 2: Extract the actual key content if it's wrapped in headers
    // This handles cases where the key is one long line with headers but no internal newlines
    if (cleaned.startsWith('-----BEGIN') && !cleaned.includes('\n', 30)) {
        const headerMatch = cleaned.match(/^(-----BEGIN [^-]+-----)(.*)(-----END [^-]+-----)$/);
        if (headerMatch) {
            const [_, header, body, footer] = headerMatch;
            // Clean the body of any remaining whitespace or weird characters
            const cleanBody = body.replace(/\s/g, '');
            // Wrap the body at 64 chars
            const wrappedBody = cleanBody.match(/.{1,64}/g)?.join('\n');
            return `${header}\n${wrappedBody}\n${footer}\n`;
        }
    }

    // Step 3: Ensure it ends with a newline
    return cleaned.endsWith('\n') ? cleaned : cleaned + '\n';
};

export const syncUserToNode = (userUuid: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(`Starting SSH sync for user: ${userUuid}`);
            const server = await Server.findOne({ status: 'online' });

            if (!server || !server.sshHost) {
                console.warn('SSH Sync: No active server with credentials found in DB.');
                return resolve();
            }

            const sshKeyContent = (server.sshKey as string) || '';
            const pKey = sshKeyContent ? normalizePrivateKey(sshKeyContent) : undefined;

            console.log(`Connecting to SSH: ${server.sshUser}@${server.sshHost}`);
            const conn = new Client();

            conn.on('ready', () => {
                console.log('✅ SSH Connection established');
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
                        if (code === 0) resolve();
                        else reject(new Error(`Command failed with code ${code}: ${stderr}`));
                    }).on('data', (data: any) => {
                        // stdout ignored
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
                password: (server.sshPassword as any) || undefined,
                privateKey: pKey,
                readyTimeout: 30000
            });

        } catch (err) {
            console.error('Fatal SSH Sync Error:', err);
            reject(err);
        }
    });
};
