import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Server from './models/Server';

dotenv.config();

const servers = [
    {
        name: 'Orbixa-Mumbai-01',
        location: 'Mumbai, India',
        host: 'mumbai.orbixavpn.com',
        port: 443,
        sni: 'mumbai.orbixavpn.com',
        publicKey: 'your_public_key_here',
        shortId: 'your_short_id',
        status: 'online',
        load: 12,
        ping: '24ms'
    }
];

const seed = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/orbixa';
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB Atlas for seeding');

        await Server.deleteMany({});
        await Server.insertMany(servers);

        console.log('✅ Seeded initial servers');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
};

seed();
