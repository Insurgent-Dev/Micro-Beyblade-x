import React from 'react';
import { Layers ,Zap ,ChevronRight } from 'lucide-react';
import { SectionHeader, FormulaCard, InfoBox, TableRow, WikiLayout } from '../components';

export default function Page() {
    return (
        <WikiLayout title="ระบบและชิ้นส่วน (Core Systems)" icon={<Layers className="w-4 h-4 text-cyan-400" />}>
            <section id="system" className="bg-[#121826] border border-slate-800 rounded-2xl p-6 space-y-4">
                    <SectionHeader icon={<Zap className="w-5 h-5 text-cyan-400" />} title="1. ระบบ Xtreme Gear Sports คืออะไร" />
                    <p className="text-slate-300 leading-relaxed">
                        Beyblade X (2023) คือ Beyblade รุ่นที่ 4 จาก Takara Tomy จุดเด่นที่สุดคือ <strong className="text-white">X-Treme Rail</strong>
                        — รางฟันเฟืองรอบสนามที่สามารถล็อกกับฟันเฟืองของ Bit ทำให้เกิดปรากฏการณ์ <strong>X-Treme Dash</strong>
                        ซึ่งเพิ่มความเร็วและพลังปะทะอย่างมีนัยสำคัญ ส่งผลให้ฟิสิกส์การปะทะและการนับคะแนนเปลี่ยนแปลงไปจากรุ่นก่อนหน้า
                    </p>
                    <InfoBox color="blue" title="ข้อแตกต่างจากรุ่น Burst (แก้ไขสำคัญ)">
                        ระบบ <strong>Burst</strong> ยังคงมีอยู่ในบริบทของการหลุดล็อกชิ้นส่วน (Burst Finish) และให้คะแนนตามกติกา
                        แต่ Beyblade X เพิ่มระบบรางและผลลัพธ์ใหม่ ๆ เช่น <strong>Over Finish</strong> และ <strong>X-Treme Finish</strong> ที่ให้คะแนนแตกต่างกันตามกติกาปัจจุบัน
                        (ดูสรุปคะแนนด้านล่าง)
                    </InfoBox>
                </section>
            <section id="parts" className="bg-[#121826] border border-slate-800 rounded-2xl p-6 space-y-4">
                    <SectionHeader icon={<Layers className="w-5 h-5 text-amber-400" />} title="2. ชิ้นส่วน: Blade / Ratchet / Bit" />
                    <div className="overflow-x-auto rounded-xl border border-slate-800">
                        <table className="w-full">
                            <thead>
                                <TableRow header cells={['ชิ้นส่วน', 'หน้าที่', 'ผลต่อฟิสิกส์', 'ตัวอย่าง']} />
                            </thead>
                            <tbody>
                                <TableRow cells={['Blade', 'ชั้นบนสุด — จุดปะทะ', 'กำหนด I (โมเมนต์ความเฉื่อย) และแรง ATK/DEF/STA', 'Phoenix Wing, Wizard Rod']} />
                                <TableRow cells={['Ratchet', 'ชั้นกลาง — ล็อกและปรับความสูง', 'กำหนดมุมปะทะ, จำนวนแฉก → ความเสี่ยง Burst', 'เช่น 1-50, 3-60, 5-60, 9-60']} />
                                <TableRow cells={['Bit', 'แกนล่าง — สัมผัสพื้น', 'กำหนด μ (แรงเสียดทาน), รูปแบบการเคลื่อนที่, ความเร็ว', 'F (Flat), B (Ball), N (Needle)']} />
                            </tbody>
                        </table>
                    </div>
                    <InfoBox color="amber" title="CX System (Custom Line)">
                        ซีรีส์ CX เป็นระบบโมดูลาร์เชิงวิวัฒนาการ — โปรดสังเกต 2 ยุคสำคัญ:
                        <ul className="mt-2 list-disc pl-5">
                            <li><strong>Original 3-Piece System (2025):</strong> Lock Chip + Main Blade + Assist Blade (เช่น Dran Brave, Wizard Arc)</li>
                            <li><strong>Expand 4-Piece System (2026):</strong> Lock Chip + Metal Blade + Over Blade + Assist Blade (เช่น Bahamut Blitz [CX-13], Knight Fortress [CX-14])</li>
                        </ul>
                        การเพิ่มชิ้นส่วนทำให้มวลรวมของเบลดเปล่าๆ ขึ้นไปถึง ~40–43g ในบางรุ่น จึงต้องคำนวณมวลรวมและ I ใหม่เมื่อออกแบบคอมโบ
                    </InfoBox>
                </section>
            <section id="series" className="bg-[#121826] border border-slate-800 rounded-2xl p-6 space-y-4">
                    <SectionHeader icon={<Layers className="w-5 h-5 text-cyan-400" />} title="9. ความแตกต่าง BX / UX / CX" />
                    <div className="overflow-x-auto rounded-xl border border-slate-800">
                        <table className="w-full text-sm">
                            <thead><TableRow header cells={['ซีรีส์', 'ชื่อเต็ม', 'Inertia Factor k', 'จุดเด่น', 'ข้อด้อย']} /></thead>
                            <tbody>
                                <TableRow cells={['BX', 'Basic Line', '0.90–1.18', 'หาง่าย ราคาถูก ชิ้นส่วนหลากหลาย', 'L ต่ำกว่า UX/CX']} />
                                <TableRow cells={['UX', 'Unique Line', '0.90–1.25', 'น้ำหนักขอบนอกสูง → L และสปินเวลายาวกว่า', 'หายากกว่า BX']} />
                                <TableRow cells={['CX', 'Custom Line', '1.20–1.28', 'Sub-Blade สลับได้ ปรับ I ได้ละเอียดสุด', 'ราคาสูง ชิ้นส่วนน้อย']} />
                            </tbody>
                        </table>
                    </div>
                </section>
        </WikiLayout>
    );
}
