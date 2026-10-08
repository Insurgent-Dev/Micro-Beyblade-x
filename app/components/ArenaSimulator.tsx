'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Gauge, RotateCcw } from 'lucide-react';
import type { Combo } from '../lib/types';

interface ArenaSimulatorProps {
    currentCombo: Combo;
}

export default function ArenaSimulator({ currentCombo }: ArenaSimulatorProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [speed, setSpeed] = useState<number>(0);
    const [xdashCount, setXdashCount] = useState<number>(0);
    const [staminaRem, setStaminaRem] = useState<number>(100);

    const beyState = useRef({
        x: 225,
        y: 180,
        vx: 1.5,
        vy: -1.5,
        angle: 0,
        stamina: 100,
        xdashes: 0,
    });

    const resetSim = () => {
        beyState.current = {
            x: 225,
            y: 180,
            vx: (Math.random() - 0.5) * 5,
            vy: (Math.random() - 0.5) * 5,
            angle: 0,
            stamina: 100,
            xdashes: 0,
        };
        setXdashCount(0);
        setStaminaRem(100);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            const radius = 190;

            // Stadium Base
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fillStyle = '#0f172a';
            ctx.fill();
            ctx.lineWidth = 4;
            ctx.strokeStyle = '#1e293b';
            ctx.stroke();

            // X-Line Rail
            ctx.beginPath();
            ctx.arc(cx, cy, radius - 15, 0, Math.PI * 2);
            ctx.lineWidth = 8;
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
            ctx.stroke();

            // X-Dash Highlights
            ctx.beginPath();
            ctx.arc(cx, cy, radius - 15, -Math.PI / 4, Math.PI / 1.5);
            ctx.lineWidth = 8;
            ctx.strokeStyle = 'rgba(255, 230, 0, 0.5)';
            ctx.stroke();

            // Center Zone
            ctx.beginPath();
            ctx.arc(cx, cy, 60, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(30, 41, 59, 0.3)';
            ctx.fill();

            // Update Physics
            const state = beyState.current;
            const bitType = currentCombo.bit.type;
            const bitSpeed = currentCombo.bit.speed / 10;

            if (state.stamina > 0) {
                state.stamina -= 0.08;
                state.angle += state.stamina / 10;

                if (bitType === 'Attack') {
                    const distFromCenter = Math.hypot(state.x - cx, state.y - cy);
                    if (distFromCenter > radius - 30) {
                        state.vx *= -1.35;
                        state.vy *= -1.35;
                        state.xdashes++;
                        setXdashCount(state.xdashes);
                    } else {
                        state.vx += (Math.random() - 0.5) * (bitSpeed * 0.4);
                        state.vy += (Math.random() - 0.5) * (bitSpeed * 0.4);
                    }
                } else if (bitType === 'Stamina') {
                    state.vx += (cx - state.x) * 0.005;
                    state.vy += (cy - state.y) * 0.005;
                    state.vx *= 0.95;
                    state.vy *= 0.95;
                } else {
                    state.vx += (cx - state.x) * 0.002;
                    state.vy += (cy - state.y) * 0.002;
                    state.vx *= 0.97;
                    state.vy *= 0.97;
                }

                state.x += state.vx;
                state.y += state.vy;

                // Boundary constraint
                const dist = Math.hypot(state.x - cx, state.y - cy);
                if (dist > radius - 12) {
                    const angle = Math.atan2(state.y - cy, state.x - cx);
                    state.x = cx + Math.cos(angle) * (radius - 12);
                    state.y = cy + Math.sin(angle) * (radius - 12);
                    state.vx *= -0.8;
                    state.vy *= -0.8;
                }

                setSpeed(Math.round(Math.hypot(state.vx, state.vy) * 12));
                setStaminaRem(Math.max(0, Math.round(state.stamina)));
            }

            // Draw Beyblade
            ctx.save();
            ctx.translate(state.x, state.y);
            ctx.rotate((state.angle * Math.PI) / 180);

            // Glow
            ctx.beginPath();
            ctx.arc(0, 0, 18, 0, Math.PI * 2);
            ctx.fillStyle = bitType === 'Attack' ? 'rgba(255, 0, 85, 0.6)' : 'rgba(0, 240, 255, 0.6)';
            ctx.fill();

            // Main Circle
            ctx.beginPath();
            ctx.arc(0, 0, 14, 0, Math.PI * 2);
            ctx.fillStyle = '#334155';
            ctx.fill();
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();

            // Wings
            ctx.fillStyle = '#00f0ff';
            ctx.fillRect(-12, -3, 24, 6);
            ctx.fillRect(-3, -12, 6, 24);

            ctx.restore();

            animId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animId);
    }, [currentCombo]);

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const clickX = (e.clientX - rect.left) * scaleX;
        const clickY = (e.clientY - rect.top) * scaleY;

        const bitSpeedMult = currentCombo.bit.speed / 15;
        beyState.current.x = clickX;
        beyState.current.y = clickY;
        beyState.current.vx = (Math.random() - 0.5) * bitSpeedMult;
        beyState.current.vy = (Math.random() - 0.5) * bitSpeedMult;
        beyState.current.stamina = 100;
    };

    return (
        <div className="space-y-6">
            <div className="bg-[#121826] p-5 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-center mb-3">
                    <div>
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Gauge className="w-5 h-5 text-cyan-400" /> X-Celerator Arena Test
                        </h2>
                        <p className="text-xs text-slate-400">จำลองพฤติกรรมการเคลื่อนที่ตามประเภท Bit และสายของคอมโบ</p>
                    </div>
                    <button
                        id="arena-reset-btn"
                        onClick={resetSim}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg text-slate-300 transition-all flex items-center gap-1.5"
                    >
                        <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ตตำแหน่ง
                    </button>
                </div>

                {/* Canvas Box */}
                <div className="relative w-full aspect-square max-w-[450px] mx-auto bg-slate-950 rounded-2xl border-2 border-slate-800 overflow-hidden shadow-inner flex items-center justify-center">
                    <canvas
                        ref={canvasRef}
                        id="arena-canvas"
                        width={450}
                        height={450}
                        onClick={handleCanvasClick}
                        className="w-full h-full cursor-pointer"
                    />

                    <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
                            <span className="font-bold text-white">
                                {currentCombo.blade.name} {currentCombo.ratchet.name}{currentCombo.bit.id}
                            </span>
                        </div>
                        <span className="text-slate-400">คลิกที่สนามเพื่อเปลี่ยนจุดชู้ต</span>
                    </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs text-slate-400 mt-4">
                    <div className="p-2 bg-slate-900/50 rounded-xl border border-slate-800">
                        <span className="block text-cyan-400 font-bold text-sm">{speed} km/h</span>
                        <span>ความเร็วเคลื่อนที่</span>
                    </div>
                    <div className="p-2 bg-slate-900/50 rounded-xl border border-slate-800">
                        <span className="block text-yellow-400 font-bold text-sm">{xdashCount} ครั้ง</span>
                        <span>อัตราติด X-Dash</span>
                    </div>
                    <div className="p-2 bg-slate-900/50 rounded-xl border border-slate-800">
                        <span className="block text-emerald-400 font-bold text-sm">{staminaRem}%</span>
                        <span>พลังหมุนคงเหลือ</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
