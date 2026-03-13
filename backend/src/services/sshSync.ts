import { Client } from 'ssh2';
import User from '../models/User';
import Server from '../models/Server';

export const syncUserToNode = async (userUuid: string) => {
    try {
        // In a real production environment, you would fetch the active nodes from the DB
        // For now, we sync to the primary node provided by the user
        const server = await Server.findOne({ status: 'online' });

        if (!server || !server.sshHost) {
            console.log('Skipping SSH sync: No active server with SSH credentials found.');
            return;
        }

        const conn = new Client();

        conn.on('ready', () => {
            console.log(`SSH Connection Ready to ${server.sshHost}`);
            // Running the add_user script on the remote server
            conn.exec(`sudo /usr/local/bin/add_user.sh ${userUuid}`, (err, stream) => {
                if (err) throw err;
                stream.on('close', (code: number, signal: string) => {
                    console.log(`SSH Sync Finished with code ${code}`);
                    conn.end();
                }).on('data', (data: any) => {
                    console.log('SSH STDOUT: ' + data);
                }).stderr.on('data', (data: any) => {
                    console.log('SSH STDERR: ' + data);
                });
            });
        }).connect({
            host: server.sshHost,
            port: 22,
            username: server.sshUser || 'ubuntu',
            password: server.sshPassword as any // Using password for now as per user request context
            // In premium setups, you'd use direct privateKey: fs.readFileSync('path/to/key')
        });

    } catch (err) {
        console.error('Failed to sync user via SSH:', err);
    }
};
