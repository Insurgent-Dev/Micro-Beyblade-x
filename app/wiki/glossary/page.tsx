import React from 'react';
import { BookOpen ,ChevronRight } from 'lucide-react';
import { SectionHeader, FormulaCard, InfoBox, TableRow, WikiLayout } from '../components';

export default function Page() {
    return (
        <WikiLayout title="อภิธานศัพท์ (Glossary)" icon={<BookOpen className="w-4 h-4 text-cyan-400" />}>
            <section id="glossary" className="bg-[#121826] border border-slate-800 rounded-2xl p-6 space-y-3">
                    <SectionHeader icon={<BookOpen className="w-5 h-5 text-slate-400" />} title="10. อภิธานศัพท์" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        {[
                            ['Angular Momentum (L)', 'โมเมนตัมเชิงมุม — ค่าความ "ดื้อ" ในการหมุน หน่วย kg·m²/s'],
                            ['Moment of Inertia (I)', 'โมเมนต์ความเฉื่อย — การกระจายมวลรอบแกนหมุน หน่วย kg·m²'],
                            ['Angular Velocity (ω)', 'ความเร็วเชิงมุม หน่วย rad/s ← แปลงจาก RPM'],
                            ['Impulse (J)', 'แรงกระตุ้น = การเปลี่ยนแปลงโมเมนตัม หน่วย N·s'],
                            ['Spin-down Torque (τ)', 'ทอร์กที่เบรกการหมุน เกิดจากแรงเสียดทาน Bit กับพื้นสนาม'],
                            ['X-Celerator Rail', 'รางเร่งความเร็วในสนาม ทำให้เบย์พุ่งแรงขึ้น 2-3 เท่า'],
                            ['Over Finish', 'เบย์กระเด็นออกนอกขอบสนาม → แพ้ทันที'],
                            ['X-treme Finish', 'เบย์ออกทาง X-Rail → แพ้ทันที ให้ 2 แต้ม'],
                            ['Inertia Factor (k)', 'ค่าปรับ I ตามการออกแบบเบลด BX≈1.0, UX≈1.15, CX≈1.25'],
                            ['Burst Risk Score (R)', 'คะแนนความเสี่ยง Burst จากจำนวนแฉก Ratchet และ Bit Resist'],
                        ].map(([term, def]) => (
                            <div key={term} className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                                <div className="font-bold text-white text-xs">{term}</div>
                                <div className="text-slate-400 text-xs mt-1 leading-relaxed">{def}</div>
                            </div>
                        ))}
                    </div>
                </section>
        </WikiLayout>
    );
}
