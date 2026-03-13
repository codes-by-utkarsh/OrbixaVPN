import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    uuid: { type: String, default: uuidv4, unique: true },
    plan: { type: String, enum: ['Standard', 'Pro', 'Business'], default: 'Standard' },
    downloaded: { type: Number, default: 0 }, // in MB
    limit: { type: Number, default: 10000 }, // in MB
    createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default mongoose.model('User', userSchema);
