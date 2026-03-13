import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { getCurrentWindow } from "@tauri-apps/api/window";
import {
  Shield, ShieldCheck, Settings, Activity, Terminal,
  Clipboard, Wifi, Globe, X, Minus, ChevronRight
} from "lucide-react";

function App() {
  const [vlessLink, setVlessLink] = useState("");
  const [status, setStatus] = useState("Disconnected");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ ping: "--", server: "No server active", country: "--" });
  const [error, setError] = useState("");
  const [logs, setLogs] = useState<string[]>(["[System] App initialized"]);
  const [showLogs, setShowLogs] = useState(false);

  useEffect(() => {
    // Listen for backend logs
    const unlisten = listen<string>("vpn-log", (event) => {
      setLogs(prev => [...prev.slice(-49), `[Xray] ${event.payload}`]);
    });
    return () => { unlisten.then(f => f()); };
  }, []);

  const handleLinkChange = async (link: string) => {
    setVlessLink(link);
    if (link.startsWith("vless://")) {
      try {
        const config: any = await invoke("parse_vless", { link });
        setStats({
          ping: "24", // Still simulated for now
          server: config.address,
          country: "IN"
        });
        setError("");
      } catch (err: any) {
        setError(err);
      }
    }
  };

  const toggleConnection = async () => {
    if (status === "Disconnected" && !vlessLink) {
      setError("Missing configuration");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const result = await invoke("toggle_vpn", { active: status === "Disconnected" });
      setStatus(result as string);
      setLogs(prev => [...prev, `[Action] ${status === "Disconnected" ? "Connecting..." : "Disconnecting..."}`]);
    } catch (err: any) {
      setError(err);
      setLogs(prev => [...prev, `[Error] ${err}`]);
    } finally {
      setLoading(false);
    }
  };

  const appWindow = getCurrentWindow();

  return (
    <div className="flex h-screen w-screen bg-background text-white font-sans overflow-hidden border border-white/10 rounded-xl">
      {/* Draggable Title Bar */}
      <div
        data-tauri-drag-region
        className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-4 z-50 select-none"
      >
        <div className="flex items-center gap-2 pointer-events-none">
          <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Orbixa VPN</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => appWindow.minimize()}
            className="p-1.5 hover:bg-white/5 rounded-md text-muted transition-colors"
          >
            <Minus size={14} />
          </button>
          <button
            onClick={() => appWindow.close()}
            className="p-1.5 hover:bg-red-500/20 hover:text-red-400 rounded-md text-muted transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-16 flex flex-col items-center py-12 gap-8 bg-surface border-r border-white/5 z-40">
        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
          <Globe size={24} />
        </div>
        <div className="flex flex-col gap-6 mt-auto mb-6 opacity-60">
          <Activity size={20} className="hover:text-primary transition-colors cursor-pointer" />
          <Terminal
            size={20}
            className={`${showLogs ? 'text-primary' : ''} hover:text-primary transition-colors cursor-pointer`}
            onClick={() => setShowLogs(!showLogs)}
          />
          <Settings size={20} className="hover:text-primary transition-colors cursor-pointer" />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 pt-14 flex flex-col gap-8 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

        <header className="flex justify-between items-center relative z-10">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Status</h1>
            <p className="text-muted text-sm flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full ${status === 'Connected' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-muted'}`} />
              {status}
            </p>
          </div>
          <div className="glass px-4 py-2 rounded-full flex gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5"><Wifi size={14} className="text-primary" /> {stats.ping} ms</div>
            <div className="border-r border-white/10" />
            <div className="flex items-center gap-1.5"><Globe size={14} className="text-secondary" /> IN</div>
          </div>
        </header>

        {/* Connect Section */}
        <section className="flex-1 flex flex-col items-center justify-center gap-10 relative z-10">
          <div className="relative group">
            {/* Outer Ring */}
            <div className={`absolute inset-[-15px] rounded-full border-2 border-white/5 transition-all duration-700 ${status === 'Connected' ? 'scale-110 opacity-0' : ''}`} />

            <button
              onClick={toggleConnection}
              disabled={loading}
              className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center transition-all duration-500 overflow-hidden
                ${status === 'Connected'
                  ? 'bg-primary/20 shadow-[0_0_50px_rgba(0,242,255,0.2)] border-primary'
                  : 'bg-surface border-white/10'
                } border-2 hover:border-primary/50 glow-btn`}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
              ) : status === "Connected" ? (
                <>
                  <ShieldCheck size={64} className="text-primary animate-pulse" />
                  <span className="text-xs uppercase tracking-widest mt-4 font-bold text-primary">Connected</span>
                </>
              ) : (
                <>
                  <Shield size={64} className="text-white opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all" />
                  <span className="text-xs uppercase tracking-widest mt-4 font-bold opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all">Connect</span>
                </>
              )}
            </button>
          </div>

          <div className="w-full max-w-sm flex flex-col gap-2 relative group">
            <div className="flex items-center gap-2 glass p-1.5 rounded-xl border border-white/5 focus-within:border-primary/30 transition-all">
              <input
                type="text"
                placeholder="Paste VLESS link..."
                className="bg-transparent border-none outline-none flex-1 px-4 py-2 text-sm text-white placeholder:text-muted cursor-text"
                value={vlessLink}
                onChange={(e) => handleLinkChange(e.target.value)}
              />
              <button
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  handleLinkChange(text);
                }}
                className="p-2 hover:bg-white/5 rounded-lg text-muted hover:text-white transition-all cursor-pointer"
              >
                <Clipboard size={18} />
              </button>
            </div>
            {error && (
              <p className="text-[10px] text-red-400 bg-red-400/10 px-3 py-1.5 rounded-lg border border-red-400/20">
                {error}
              </p>
            )}
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 gap-4 relative z-10 mb-4">
          <div className="glass p-4 rounded-2xl flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest text-muted font-bold">Server</span>
            <span className="font-semibold text-[13px] truncate">{stats.server !== "--" ? stats.server : 'No server active'}</span>
          </div>
          <div className="glass p-4 rounded-2xl flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-widest text-muted font-bold">Protocol</span>
            <span className="font-semibold text-[13px]">VLESS - WebSocket</span>
          </div>
        </section>

        {/* Overlay Log Panel */}
        <div className={`absolute bottom-0 left-0 right-0 h-64 bg-surface/95 backdrop-blur-xl border-t border-white/5 z-50 transition-transform duration-500 rounded-t-3xl ${showLogs ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="flex items-center justify-between p-4 px-6 border-b border-white/5">
            <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 opacity-60">
              <Terminal size={14} /> Connection Logs
            </span>
            <button onClick={() => setShowLogs(false)} className="text-muted hover:text-white transition-colors">
              <ChevronRight className="rotate-90" size={18} />
            </button>
          </div>
          <div className="p-4 px-6 h-48 overflow-y-auto font-mono text-[10px] text-muted space-y-1">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-2">
                <span className="opacity-30">[{i}]</span>
                <span>{log}</span>
              </div>
            ))}
            <div id="log-end" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
