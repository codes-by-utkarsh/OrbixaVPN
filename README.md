# Orbixa VPN

Tagline: Secure. Private. Borderless.

## Overview
Orbixa VPN is a privacy-focused VPN service that routes internet traffic through distributed VPN servers using the VLESS protocol over Xray-core.

## Architecture
- **Frontend Web Platform:** Next.js + TailwindCSS + ShadCN UI
- **Backend Control Plane:** Spring Boot + MongoDB Atlas + Spring Security
- **Desktop VPN Client:** Tauri + React + Rust
- **Distributed VPN Servers:** Xray-core managed via VPS deployments

## Directory Structure
- `backend/` - Spring Boot backend API with MongoDB integration.
- `frontend/` - Next.js web application for users and admins.
- `desktop-client/` - Tauri based desktop client with embedded Xray routing.
- `infrastructure/` - Scripts, Nginx configuration, Docker setups, and Xray configs.

## Deployment Instructions

### 1. Prerequisites
- Docker and Docker Compose installed
- MongoDB Atlas cluster URL
- Cloudflare account for DNS and proxy

### 2. Environment Variables
Copy `.env.example` to `.env` and fill in the values:
```bash
cp .env.example .env
```

### 3. Deploying the Backend & Frontend
We use Docker Compose to deploy the control plane.
```bash
docker-compose up -d --build
```
The frontend will be available at `http://localhost:3000` and the backend strictly via API routes or defined proxy on `http://localhost:8080`.

### 4. Deploying a new VPN Node
Use the provided `infrastructure/xray/config.json.template` when setting up a new VPS.
The backend's `ServerAdminController` handles generating commands to deploy new VPS servers via SSH. The admin panel automates this.

### 5. Desktop Client
To build the desktop client locally:
```bash
cd desktop-client
npm install
npm run tauri build
```
Note: Ensure Rust and cargo are installed on the build machine.

## Design Philosophy
**Cybersecurity-focused Design:** Dark theme, electric blue highlights, minimalistic layout, soft glow effects. Inspired by the best tier VPN startup aesthetics.
