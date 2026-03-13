import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Server from './models/Server';

dotenv.config({ path: path.join(__dirname, '../.env') });

async function checkServers() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const servers = await Server.find({});
        console.log('Registered Servers:');
        servers.forEach(s => {
            console.log('--- Server ---');
            console.log('Name:', s.name);
            console.log('Host:', s.host);
            console.log('SSH Host:', s.sshHost);
            console.log('Status:', s.status);
            console.log('SSH Key Present:', !!s.sshKey);
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkServers();
