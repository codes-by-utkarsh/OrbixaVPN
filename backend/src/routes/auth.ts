import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { syncUserToNode } from '../services/sshSync';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'User already exists' });

        const user = new User({ email, password });
        await user.save();

        // Sync to VPN nodes immediately
        try {
            console.log(`Syncing new user ${user.email} to nodes...`);
            await syncUserToNode(user.uuid as string);
            console.log(`Initial sync successful for ${user.email}`);
        } catch (syncErr) {
            console.error('Registration Sync Error (Critical):', syncErr);
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        res.status(201).json({ token, user: { email: user.email, uuid: user.uuid, plan: user.plan } });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Background sync to ensure user is whitelisted
        syncUserToNode(user.uuid as string).catch((err: any) => console.error('Login Sync Error:', err));

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        res.json({ token, user: { email: user.email, uuid: user.uuid, plan: user.plan } });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Auth Middleware
export const auth = async (req: any, res: any, next: any) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) throw new Error();
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        const user = await User.findById(decoded.id);
        if (!user) throw new Error();
        req.user = user;
        next();
    } catch (e) {
        res.status(401).json({ message: 'Please authenticate' });
    }
};

router.get('/profile', auth, async (req: any, res) => {
    res.json(req.user);
});

export default router;
