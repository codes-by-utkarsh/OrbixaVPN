import express from 'express';
import { auth } from './auth';
import Server from '../models/Server';

const router = express.Router();

router.get('/servers', auth, async (req, res) => {
    try {
        const servers = await Server.find({ status: { $ne: 'offline' } });
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
        // Format: vless://uuid@host:port?security=reality&sni=sni&fp=chrome&pbk=publicKey&sid=shortId&type=grpc&serviceName=grpcName#Name
        const vlessLink = `vless://${user.uuid}@${server.host}:${server.port}?type=ws&security=tls&path=%2Forbixa#Orbixa-${server.location.replace(' ', '-')}`;

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

export default router;
