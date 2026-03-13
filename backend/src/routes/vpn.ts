import express from 'express';
import { auth } from './auth';
import Server from '../models/Server';
import { syncUserToNode } from '../services/sshSync';

const router = express.Router();

router.get('/servers', auth, async (req, res) => {
    try {
        // Exclude sensitive SSH details from being sent to the frontend
        const servers = await Server.find({ status: { $ne: 'offline' } })
            .select('-sshHost -sshUser -sshPassword -sshKey');
        res.json(servers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching servers' });
    }
});

router.get('/config', auth, async (req: any, res) => {
    try {
        const { serverId } = req.query;
        const server = await Server.findById(serverId);
        if (!server) return res.status(404).json({ message: 'Server not found' });

        const user = req.user;

        // VLESS URI Construction (Reality implementation)
        const locationPart = server.location.split(',')[0].trim().replace(/\s+/g, '-');
        const vlessLink = `vless://${user.uuid}@${server.host}:${server.port}?type=ws&security=tls&path=/orbixa#Orbixa-${locationPart}`;

        res.json({ link: vlessLink });
    } catch (err) {
        res.status(500).json({ message: 'Error generating config' });
    }
});

router.get('/usage', auth, async (req: any, res) => {
    res.json({
        downloaded: req.user.downloaded,
        limit: req.user.limit
    });
});

router.post('/sync', auth, async (req: any, res) => {
    try {
        await syncUserToNode(req.user.uuid);
        res.json({ message: 'Sync successful. Your UUID is now whitelisted on the server.' });
    } catch (err: any) {
        console.error('Manual Sync Failed:', err.message);
        res.status(500).json({ message: `Sync failed: ${err.message || 'Check SSH credentials or script path'}` });
    }
});

export default router;
