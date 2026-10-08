import React from 'react';
import { Shield ,FlaskConical ,Zap ,ChevronRight ,RotateCw ,Wind } from 'lucide-react';
import { SectionHeader, FormulaCard, InfoBox, TableRow, WikiLayout } from '../components';

export default function Page() {
    return (
        <WikiLayout title="ฟิสิกส์และกลศาสตร์ (Physics & Mechanics)" icon={<FlaskConical className="w-4 h-4 text-cyan-400" />}>
            <section id="physics" className="bg-[#121826] border border-slate-800 rounded-2xl p-6 space-y-4">
                    <SectionHeader icon={<FlaskConical className="w-5 h-5 text-rose-400" />} title="3. หลักฟิสิกส์ที่ใช้คำนวณ" subtitle="หน่วย SI: kg, m, s, J, N, N·m" />
                    <div className="overflow-x-auto rounded-xl border border-slate-800">
                        <table className="w-full">
                            <thead>
                                <TableRow header cells={['สัญลักษณ์', 'ชื่อ', 'สูตร', 'หน่วย']} />
                            </thead>
                            <tbody>
                                <TableRow cells={['ω',       'ความเร็วเชิงมุม',        'ω = 2π·RPM/60',              'rad/s']} />
                                <TableRow cells={['I',       'โมเมนต์ความเฉื่อย',      'I = ½·m·r²·k',               'kg·m²']} />
                                <TableRow cells={['L',       'โมเมนตัมเชิงมุม',        'L = I·ω',                    'kg·m²/s']} />
                                <TableRow cells={['E_rot',   'พลังงานจลน์การหมุน',     'E_rot = ½·I·ω²',             'J']} />
                                <TableRow cells={['E_lin',   'พลังงานจลน์เชิงเส้น',    'E_lin = ½·m·v²',             'J']} />
                                <TableRow cells={['τ',       'ทอร์กแรงเสียดทาน',       'τ = μ·m·g·r_bit',            'N·m']} />
                                <TableRow cells={['α',       'อัตราลดทอนรอบหมุน',       'α = τ/I (แปลงเป็น RPM/s)',    'rad/s²']} />
                                <TableRow cells={['t_spin',  'เวลาหมุน (ประมาณ)',       't = RPM / DecayRate',        's']} />
                                <TableRow cells={['F',       'แรงกระแทก',              'F = J/Δt (อิงรอบที่ลดลงตาม t)','N']} />
                                <TableRow cells={['Stability','ความเสถียร (สมดุล)',     'S = (m·r)/h (h=ความสูง)',     'Index']} />
                            </tbody>
                        </table>
                    </div>
                </section>
            <section id="momentum" className="bg-[#121826] border border-slate-800 rounded-2xl p-6 space-y-5">
                    <SectionHeader icon={<RotateCw className="w-5 h-5 text-sky-400" />} title="4. โมเมนตัมเชิงมุม (Angular Momentum)" subtitle="หัวใจหลักของ Beyblade X" />
                    <FormulaCard
                        symbol="L" name="โมเมนตัมเชิงมุม"
                        formula="L = I × ω  =  (½ · m · r² · k)  ×  (2π · RPM / 60)"
                        unit="kg·m²/s"
                        explain="L คือค่าที่บอกว่า 'เบย์ต้านทานการเปลี่ยนแปลงการหมุนได้มากแค่ไหน' — เหมือน 'ความดื้อ' ในการหมุน ยิ่ง L สูง เบย์ยิ่งสปินนาน และต้านแรงปะทะจากคู่แข่งได้ดีกว่า เมื่อเบย์ถูกชน L จะลดลง เมื่อ L = 0 เบย์หยุดหมุน"
                        example="Phoenix Wing (38g, k=1.1) ที่ 5500 RPM → ω ≈ 575.9 rad/s → I ≈ 2.41×10⁻⁵ kg·m² → L ≈ 0.01389 kg·m²/s"
                    />
                    <FormulaCard
                        symbol="I" name="โมเมนต์ความเฉื่อย"
                        formula="I = ½ · m · r² · k    (สมการ hollow disk × inertia factor k)"
                        unit="kg·m²"
                        explain="I บอกว่า 'มวลกระจายออกจากแกนหมุนมากแค่ไหน' ยิ่งมวลอยู่ขอบนอก (UX/CX series) ยิ่ง I สูง → L สูง → หมุนนาน ค่า k คือ inertia factor ของเบลด BX ≈ 1.0, UX ≈ 1.1–1.25, CX ≈ 1.2–1.3"
                        example="Wizard Rod UX (35.4g, k=1.22): I สูงกว่า Dran Sword BX (34.5g, k=1.0) ถึง ~22% → L สูงกว่า → หมุนนานกว่า"
                    />
                    <InfoBox color="blue" title="ทำไม UX/CX ถึงหมุนนานกว่า BX?">
                        เบลดสาย UX และ CX ออกแบบให้มวลกระจายออกไปขอบนอก (เหมือนล้อจักรยาน vs ลูกบอล)
                        ทำให้ r² ในสูตร I เพิ่มขึ้น และ k สูงขึ้น ผลคือ L มากขึ้น → สปินนานขึ้นอย่างมีนัยสำคัญ
                    </InfoBox>
                </section>
            <section id="impulse" className="bg-[#121826] border border-slate-800 rounded-2xl p-6 space-y-5">
                    <SectionHeader icon={<Zap className="w-5 h-5 text-rose-400" />} title="5. แรงกระแทก: Impulse-Momentum Theorem" />
                    <FormulaCard
                        symbol="F" name="แรงกระแทกประสิทธิผล"
                        formula="J = Δp = m·v·sin(θ) + L·sin(θ)/10   →   F = J / Δt"
                        unit="N"
                        explain="Impulse J = การเปลี่ยนโมเมนตัมรวม (เชิงเส้น + เชิงมุม) ที่เกิดขึ้นในเวลาสั้นมาก Δt ≈ 10 ms (ระยะเวลาสัมผัส) มุมปะทะ θ กำหนดองค์ประกอบแรงตั้งฉาก: sin(90°)=1 คือแรงเต็ม, sin(45°)≈0.707 คือแรง 70.7%"
                        example="คอมโบ 46g ที่ 5500 RPM, v=3.5 m/s, θ=45°: J ≈ 0.229 N·s → F ≈ 22.9 N — เทียบเท่าวางน้ำหนัก ~2.3 kg บนจุดปะทะเป็นเวลา 10ms"
                    />
                    <InfoBox color="rose" title="มุมปะทะ θ สำคัญมาก">
                        <ul className="space-y-1 mt-1">
                            <li><strong>90°</strong> — ชนตรง: F เต็ม 100% แต่โอกาส Burst สูง</li>
                            <li><strong>45°</strong> — เฉียงปานกลาง: F ~70.7% สมดุลระหว่างแรงและความปลอดภัย</li>
                            <li><strong>15°</strong> — เฉียดผ่าน: F ~25.9% เหมาะ Counter สาย Stamina</li>
                        </ul>
                    </InfoBox>
                </section>
            <section id="spindown" className="bg-[#121826] border border-slate-800 rounded-2xl p-6 space-y-5">
                    <SectionHeader icon={<Wind className="w-5 h-5 text-emerald-400" />} title="6. Spin-down Torque และเวลาหมุน" />
                    <FormulaCard
                        symbol="τ" name="ทอร์กแรงเสียดทาน (Spin-down Torque)"
                        formula="τ = μ · m · g · r    (แรงเสียดทานคูณระยะห่างจากแกน)"
                        unit="N·m"
                        explain="τ คือแรงที่ 'เบรก' การหมุนของเบย์ ยิ่ง τ น้อย เบย์สปินได้นานขึ้น ค่า μ ขึ้นกับประเภท Bit: Attack (μ≈0.18 วิ่งเยอะ → เสียดทานสูง) vs Stamina (μ≈0.05 วิ่งน้อย → เสียดทานต่ำ)"
                        example="B (Ball) Stamina μ=0.05: τ ≈ 5.4×10⁻⁴ N·m vs F (Flat) Attack μ=0.18: τ ≈ 1.95×10⁻³ N·m → Ball หมุนนานกว่า Flat ประมาณ 3.6 เท่า"
                    />
                    <FormulaCard
                        symbol="t" name="เวลาหมุนโดยประมาณ"
                        formula="t_spin = L / τ  =  (I·ω) / (μ·m·g·r)"
                        unit="วินาที (s)"
                        explain="สูตรนี้ประมาณเวลาหมุนภายใต้สมมติฐานว่า τ คงที่ ในความเป็นจริง τ จะเพิ่มขึ้นเล็กน้อยเมื่อเบย์ช้าลง (เอียงตัว) แต่ใช้เปรียบเทียบ combo ต่อ combo ได้ดีมาก"
                        example="Wizard Rod + 9-60 + B: L≈0.0135, τ≈5.2×10⁻⁴ → t ≈ 26 วินาที (ประมาณการ)"
                    />
                    <div className="overflow-x-auto rounded-xl border border-slate-800">
                        <table className="w-full text-sm">
                            <thead><TableRow header cells={['Bit Type', 'μ (friction)', 'ผลต่อ τ', 'สปินนาน?']} /></thead>
                            <tbody>
                                <TableRow cells={['Stamina (B, O, FB, LO)', '0.05', 'ต่ำมาก', '★★★★★']} />
                                <TableRow cells={['Defense (N, HN, UN)', '0.08', 'ต่ำ',    '★★★★☆']} />
                                <TableRow cells={['Balance (T, P, GP)', '0.12', 'ปานกลาง', '★★★☆☆']} />
                                <TableRow cells={['Attack (F, LF, GF)', '0.18', 'สูง',     '★★☆☆☆']} />
                            </tbody>
                        </table>
                    </div>
                </section>
            <section id="burst" className="bg-[#121826] border border-slate-800 rounded-2xl p-6 space-y-4">
                    <SectionHeader icon={<Shield className="w-5 h-5 text-purple-400" />} title="7. ระบบ Burst และความเสี่ยง" />
                    <FormulaCard
                        symbol="R" name="Burst Risk Score"
                        formula="R = (sides × 1.1) − (bitBurstResist × 0.8)"
                        unit="คะแนน (ไม่มีหน่วย)"
                        explain="แฉก Ratchet มากขึ้น → ฟันล็อกถี่ขึ้น → โอกาสหลุดล็อกในแต่ละรอบสูงขึ้น (×1.1 ต่อแฉก) ค่า bitBurstResist ของ Bit ลดความเสี่ยง: Gear Flat (3), Gear Point (3) ป้องกันได้ดีกว่า Ball (1), Needle (1)"
                        example="9-60 (9 แฉก) + Ball (resist 1): R = 9×1.1 − 1×0.8 = 9.1 → High Risk! แต่ 3-60 + Gear Point: R = 3×1.1 − 3×0.8 = 0.9 → Low Risk"
                    />
                    <div className="overflow-x-auto rounded-xl border border-slate-800">
                        <table className="w-full text-sm">
                            <thead><TableRow header cells={['ระดับ', 'คะแนน R', 'ความหมาย', 'แนะนำ']} /></thead>
                            <tbody>
                                <TableRow cells={['ต่ำ (Low)', 'R ≤ 3.0', 'ล็อกแน่นมาก Burst ยาก', 'เหมาะกับสาย Stamina ที่หมุนนาน']} />
                                <TableRow cells={['กลาง (Moderate)', '3.0 < R ≤ 6.0', 'สมดุลดี ระวังแรงชนตรง', 'เหมาะกับสาย Balance/Defense']} />
                                <TableRow cells={['สูง (High)', 'R > 6.0', 'โอกาส Burst สูงมาก', 'ใช้เฉพาะสาย Attack ที่ชนเร็วชนไว']} />
                            </tbody>
                        </table>
                    </div>
                </section>
        </WikiLayout>
    );
}
