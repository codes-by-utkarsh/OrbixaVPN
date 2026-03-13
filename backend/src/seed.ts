import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Server from './models/Server';

dotenv.config();

const servers = [
    {
        name: 'Orbixa-Mumbai-Primary',
        location: 'Mumbai, India',
        host: 'in1.orbixa.0xutkarsh.tech',
        port: 443,
        sni: 'in1.orbixa.0xutkarsh.tech',
        publicKey: 'none', // Not used in your current WS+TLS config
        shortId: 'none',   // Not used in your current WS+TLS config
        status: 'online',
        load: 5,
        ping: '18ms',
        sshHost: 'in1.orbixa.0xutkarsh.tech',
        sshUser: 'ubuntu',
        sshPassword: '',
        sshKey: 'PASTE_PEM_CONTENT_HERE' // USER: Paste the text content of your .pem file here
    }
];

const seed = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        if (!MONGO_URI) throw new Error('MONGO_URI not found in .env');

        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB Atlas...');

        await Server.deleteMany({});
        await Server.insertMany(servers);

        console.log('✅ Seeded Orbixa-Mumbai-Primary to Atlas');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
};

seed();
