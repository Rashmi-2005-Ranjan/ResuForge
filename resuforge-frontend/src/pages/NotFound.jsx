import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
    const navigate = useNavigate();
    const [glitch, setGlitch] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 200);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden font-mono">

            {/* Grid background */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `linear-gradient(rgba(139,92,246,0.8) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(139,92,246,0.8) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px"
                }}
            />

            {/* Scan line effect */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)"
                }}
            />

            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                 style={{ background: "radial-gradient(circle, rgba(99,51,220,0.1) 0%, transparent 65%)" }} />

            {/* Corner decorations */}
            {["top-6 left-6", "top-6 right-6", "bottom-6 left-6", "bottom-6 right-6"].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-8 h-8 opacity-40`}
                     style={{
                         borderTop: i < 2 ? "2px solid #7c3aed" : "none",
                         borderBottom: i >= 2 ? "2px solid #7c3aed" : "none",
                         borderLeft: i % 2 === 0 ? "2px solid #7c3aed" : "none",
                         borderRight: i % 2 === 1 ? "2px solid #7c3aed" : "none",
                     }}
                />
            ))}

            {/* Main content */}
            <div className="relative text-center max-w-lg w-full select-none">

                {/* Status bar */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs text-slate-500 tracking-[0.3em] uppercase">Error Code Detected</span>
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                </div>

                {/* 404 with glitch */}
                <div className="relative inline-block mb-2">
                    {glitch && (
                        <>
                            <span className="absolute inset-0 text-[7rem] font-black leading-none tracking-tighter text-cyan-400 opacity-80"
                                  style={{ transform: "translate(-4px, 2px)", clipPath: "inset(20% 0 60% 0)" }}>
                                404
                            </span>
                            <span className="absolute inset-0 text-[7rem] font-black leading-none tracking-tighter text-red-500 opacity-80"
                                  style={{ transform: "translate(4px, -2px)", clipPath: "inset(60% 0 10% 0)" }}>
                                404
                            </span>
                        </>
                    )}
                    <span
                        className="relative text-[7rem] font-black leading-none tracking-tighter"
                        style={{
                            background: "linear-gradient(135deg, #a78bfa, #818cf8, #67e8f9)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            filter: glitch ? "blur(1px)" : "none",
                            transition: "filter 0.1s"
                        }}
                    >
                        404
                    </span>
                </div>

                {/* Glitch bar */}
                <div className="relative h-1 w-64 mx-auto mb-8 overflow-hidden rounded-full bg-slate-800">
                    <div className="absolute inset-y-0 left-0 w-full rounded-full"
                         style={{ background: "linear-gradient(90deg, #7c3aed, #4f46e5, #06b6d4)" }} />
                    {glitch && (
                        <div className="absolute inset-y-0 bg-white/60 w-8 animate-ping" style={{ left: "40%" }} />
                    )}
                </div>

                {/* Terminal-style message */}
                <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-5 mb-8 text-left backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-700/50">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        <span className="ml-2 text-xs text-slate-500 tracking-widest">system.log</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-1"><span className="text-violet-400">$</span> GET /requested-route</p>
                    <p className="text-xs text-red-400 mb-1">✗ STATUS 404: Page not found</p>
                    <p className="text-xs text-slate-500 mb-1"><span className="text-cyan-400">~</span> The requested path does not exist on this server.</p>
                    <p className="text-xs text-slate-600 flex items-center gap-1">
                        <span className="text-violet-400">$</span> awaiting input
                        <span className="inline-block w-2 h-3.5 bg-violet-400 animate-pulse ml-0.5" />
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 cursor-pointer"
                        style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
                    >
                        ← Return Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;