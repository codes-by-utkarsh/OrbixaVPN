import mongoose from 'mongoose';

const serverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    host: { type: String, required: true },
    port: { type: Number, default: 443 },
    sni: { type: String, required: true }, // For Reality SNI
    publicKey: { type: String, required: true }, // For Reality
    shortId: { type: String, required: true }, // For Reality
    status: { type: String, enum: ['online', 'offline', 'maintenance'], default: 'online' },
    load: { type: Number, default: 0 },
    ping: { type: String, default: '...' },
    sshHost: { type: String }, // For remote management
    sshUser: { type: String },
    sshPassword: { type: String },
    sshKey: { type: String }, // For .pem key orientation
});

export default mongoose.model('Server', serverSchema);
