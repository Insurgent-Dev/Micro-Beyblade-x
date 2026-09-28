'use client';

import { Trophy, AlertTriangle, CheckCircle2, Trash2 } from 'lucide-react';
import type { Combo, DeckAnalysis } from '../lib/types';

interface DeckBuilderProps {
    deck: (Combo | null)[];
    deckAnalysis: DeckAnalysis;
    onRemoveSlot: (index: number) => void;
    onGoToBuilder: () => void;
}

export default function DeckBuilder({ deck, deckAnalysis, onRemoveSlot, onGoToBuilder }: DeckBuilderProps) {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/50 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm shadow-lg shadow-slate-950/30">
                <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
                    <div>
                        <h2 className="text-2xl font-black text-white flex items-center gap-3">
                            <Trophy className="w-6 h-6 text-yellow-400" /> 3on3 Deck List
                        </h2>
                        <p className="text-xs text-slate-400 mt-1 font-medium">กฎการแข่ง Takara Tomy: ห้ามใช้ชิ้นส่วนซ้ำกันในเด็ค (No Duplicate Parts Rule)</p>
                    </div>
                    {deckAnalysis.hasDuplicates ? (
                        <span className="px-4 py-2 rounded-full text-xs font-bold bg-red-950/50 text-red-300 border border-red-500/40 flex items-center gap-2 backdrop-blur-sm shadow-lg shadow-red-500/10 whitespace-nowrap">
                            <AlertTriangle className="w-4 h-4" /> ผิดกฎ: มีชิ้นส่วนซ้ำ
                        </span>
                    ) : (
                        <span className="px-4 py-2 rounded-full text-xs font-bold bg-emerald-950/50 text-emerald-300 border border-emerald-500/40 flex items-center gap-2 backdrop-blur-sm shadow-lg shadow-emerald-500/10 whitespace-nowrap">
                            <CheckCircle2 className="w-4 h-4" /> ถูกต้องตามกฎการแข่ง
                        </span>
                    )}
                </div>

                {/* Slots */}
                <div className="space-y-4 mt-6">
                    {deck.map((slot, index) => (
                        <div key={index} className="bg-slate-900/40 p-6 rounded-2xl border border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4 hover:border-slate-600/70 transition-all duration-300 backdrop-blur-sm">
                            {!slot ? (
                                <div className="flex items-center gap-4 w-full justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-800/50 text-slate-500 font-bold flex items-center justify-center text-lg border border-slate-700/50">
                                            #{index + 1}
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-slate-300">ว่างเปล่า (Empty Slot)</div>
                                            <div className="text-xs text-slate-500">ยังไม่ได้จัดเบยเบลดลงตำแหน่งนี้</div>
                                        </div>
                                    </div>
                                    <button
                                        id={`deck-go-builder-${index}`}
                                        onClick={onGoToBuilder}
                                        className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 hover:from-cyan-500/40 hover:to-cyan-600/40 text-xs text-cyan-300 rounded-lg transition-all border border-cyan-500/30 hover:border-cyan-400/50 font-bold whitespace-nowrap"
                                    >
                                        + เลือกคอมโบลง Slot
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/30 to-cyan-600/30 text-cyan-300 border border-cyan-500/50 font-bold flex items-center justify-center text-lg">
                                            #{index + 1}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white">
                                                {slot.blade.name} {slot.ratchet.name}{slot.bit.id}
                                            </div>
                                            <div className="text-xs text-slate-400">
                                                สาย: <span className="text-slate-200">{slot.bit.type}</span> • น้ำหนัก: <span className="text-yellow-400 font-bold">{
                                                    Math.round((slot.blade.weight + slot.ratchet.weight + slot.bit.weight + (slot.subblade?.weight || 0)) * 10) / 10
                                                }g</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                                        <span className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/50 text-slate-300 border border-slate-700/50 font-bold">{slot.system}</span>
                                        <button
                                            id={`deck-remove-${index}`}
                                            onClick={() => onRemoveSlot(index)}
                                            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all border border-transparent hover:border-red-500/30"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* Deck Summary Stats */}
                <div className="mt-8 pt-6 border-t border-slate-700/50 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 p-4 rounded-2xl border border-yellow-500/20 text-center hover:border-yellow-500/40 transition-all">
                        <div className="text-xs text-yellow-400/80 font-semibold uppercase tracking-wider">น้ำหนักรวมทั้งเด็ค</div>
                        <div className="text-2xl font-black text-yellow-300 mt-1">{deckAnalysis.totalDeckWeight}g</div>
                    </div>
                    <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 p-4 rounded-2xl border border-cyan-500/20 text-center hover:border-cyan-500/40 transition-all">
                        <div className="text-xs text-cyan-400/80 font-semibold uppercase tracking-wider">สายเด่นประจำเด็ค</div>
                        <div className="text-2xl font-black text-cyan-300 mt-1">{deckAnalysis.dominantType}</div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-4 rounded-2xl border border-emerald-500/20 text-center hover:border-emerald-500/40 transition-all">
                        <div className="text-xs text-emerald-400/80 font-semibold uppercase tracking-wider">ความครอบคลุม</div>
                        <div className="text-2xl font-black text-emerald-300 mt-1">{deckAnalysis.coverage}%</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-4 rounded-2xl border border-purple-500/20 text-center hover:border-purple-500/40 transition-all">
                        <div className="text-xs text-purple-400/80 font-semibold uppercase tracking-wider">คะแนนสมดุล</div>
                        <div className="text-2xl font-black text-purple-300 mt-1">{deckAnalysis.balanceScore}/100</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
