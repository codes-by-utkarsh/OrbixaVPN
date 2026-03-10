package com.orbixa.vpn.services;

import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Service
public class SshService {

    @Value("${orbixa.ssh.private-key:}")
    private String privateKey;

    @Value("${orbixa.ssh.user:ubuntu}")
    private String sshUser;

    public void executeCommand(String host, String command) {
        if (privateKey == null || privateKey.isEmpty()) {
            System.err.println("SSH Private Key is missing. Skipping sync for host: " + host);
            return;
        }

        try {
            JSch jsch = new JSch();
            jsch.addIdentity("key", privateKey.getBytes(StandardCharsets.UTF_8), null, null);

            Session session = jsch.getSession(sshUser, host, 22);
            java.util.Properties config = new java.util.Properties();
            config.put("StrictHostKeyChecking", "no");
            session.setConfig(config);
            session.connect();

            ChannelExec channel = (ChannelExec) session.openChannel("exec");
            channel.setCommand(command);
            channel.setErrStream(System.err);

            InputStream in = channel.getInputStream();
            channel.connect();

            byte[] tmp = new byte[1024];
            while (true) {
                while (in.available() > 0) {
                    int i = in.read(tmp, 0, 1024);
                    if (i < 0)
                        break;
                    System.out.print(new String(tmp, 0, i));
                }
                if (channel.isClosed()) {
                    if (in.available() > 0)
                        continue;
                    System.out.println("exit-status: " + channel.getExitStatus());
                    break;
                }
                try {
                    Thread.sleep(1000);
                } catch (Exception ee) {
                }
            }
            channel.disconnect();
            session.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
