import React from 'react';
import Link from 'next/link';
import { BookOpen, FlaskConical, Layers, Zap, Shield, RotateCw, Wind, ChevronRight } from 'lucide-react';

// ── Reusable section components ───────────────────────────────────────────────

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
    return (
        <div className="flex items-start gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                {icon}
            </div>
            <div>
                <h2 className="text-xl font-black text-white">{title}</h2>
                {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
        </div>
    );
}

function FormulaCard({ symbol, name, formula, unit, explain, example }: {
    symbol: string; name: string; formula: string;
    unit: string; explain: string; example?: string;
}) {
    return (
        <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-5 space-y-3">
            <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-amber-400">{symbol}</span>
                <span className="text-base font-bold text-white">{name}</span>
                <span className="ml-auto text-xs font-mono text-slate-500 bg-slate-800 px-2 py-0.5 rounded">{unit}</span>
            </div>
            <div className="font-mono text-sm text-sky-300 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
                {formula}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{explain}</p>
            {example && (
                <div className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 rounded-lg px-3 py-2">
                    <span className="font-bold">ตัวอย่าง: </span>{example}
                </div>
            )}
        </div>
    );
}

function InfoBox({ color, title, children }: { color: string; title: string; children: React.ReactNode }) {
    const styles: Record<string, string> = {
        blue:   'bg-sky-950/40 border-sky-800/50 text-sky-300',
        amber:  'bg-amber-950/40 border-amber-800/50 text-amber-300',
        emerald:'bg-emerald-950/40 border-emerald-800/50 text-emerald-300',
        rose:   'bg-rose-950/40 border-rose-800/50 text-rose-300',
        violet: 'bg-violet-950/40 border-violet-800/50 text-violet-300',
    };
    return (
        <div className={`border rounded-xl p-4 text-sm leading-relaxed ${styles[color] ?? styles.blue}`}>
            <div className="font-bold mb-1">{title}</div>
            {children}
        </div>
    );
}

function TableRow({ cells, header }: { cells: string[]; header?: boolean }) {
    const Tag = header ? 'th' : 'td';
    return (
        <tr className={header ? 'bg-slate-800' : 'border-t border-slate-800 hover:bg-slate-900/50'}>
            {cells.map((c, i) => (
                <Tag key={i} className={`px-3 py-2 text-left text-sm ${header ? 'text-slate-300 font-bold' : 'text-slate-400'}`}>
                    {c}
                </Tag>
            ))}
        </tr>
    );
}

// ── Main Wiki Page ─────────────────────────────────────────────────────────────

export default function WikiPage() {
    return (
        <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans">

            {/* Top Nav */}
            <nav className="border-b border-slate-800 bg-[#121826]/90 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
                        <ChevronRight className="w-4 h-4 rotate-180" /> กลับหน้าหลัก
                    </Link>
                    <span className="text-slate-700">/</span>
                    <div className="flex items-center gap-2 text-white font-bold">
                        <BookOpen className="w-4 h-4 text-cyan-400" /> Wiki เบยเบลด X
                    </div>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-4 py-10 space-y-14">

                {/* Hero */}
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 text-xs font-bold px-4 py-1.5 rounded-full">
                        <BookOpen className="w-3.5 h-3.5" /> คู่มือฟิสิกส์และกลยุทธ์
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        Wiki เบยเบลด X<br />
                        <span className="text-cyan-400">ฉบับภาษาไทย</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
                        อธิบายหลักฟิสิกส์เบื้องหลัง Beyblade X ตั้งแต่โมเมนตัมเชิงมุม
                        ไปจนถึงกลยุทธ์การเลือกชิ้นส่วน สำหรับนักแข่งสายวิทย์และสายเด็ก
                    </p>
                </div>

                {/* TOC */}
                <div className="bg-[#121826] border border-slate-800 rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-cyan-400" /> สารบัญ
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        {[
                            ['#system',         '1. ระบบ Xtreme Gear Sports คืออะไร'],
                            ['#parts',          '2. ชิ้นส่วน: Blade / Ratchet / Bit'],
                            ['#physics',        '3. หลักฟิสิกส์ที่ใช้คำนวณ'],
                            ['#momentum',       '4. โมเมนตัมเชิงมุม (L = Iω)'],
                            ['#impulse',        '5. แรงกระแทก Impulse-Momentum'],
                            ['#spindown',       '6. Spin-down & เวลาหมุน'],
                            ['#burst',          '7. ระบบ Burst และความเสี่ยง'],
                            ['#strategy',       '8. กลยุทธ์การเลือกคอมโบ'],
                            ['#series',         '9. ความแตกต่าง BX / UX / CX'],
                            ['#glossary',       '10. อภิธานศัพท์'],
                            ['/wiki/how-to-play','📖 วิธีเล่น Beyblade X'],
                            ['/wiki/blades',     '⚔ รายการ Blade ทั้งหมด'],
                            ['/wiki/bits',      '⚙ รายการ Bit ทั้งหมด'],
                            ['/wiki/ratchets',  '🔩 รายการ Ratchet ทั้งหมด'],
                            ['/wiki/cx-parts',  '🔧 CX Custom Line Parts'],
                            ['/wiki/products',  '📦 รายการสินค้าทั้งหมด'],
                        ].map(([href, label]) => (
                            <a key={href} href={href} className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors px-3 py-2 rounded-lg hover:bg-slate-800">
                                <ChevronRight className="w-3.5 h-3.5 shrink-0" /> {label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Section 1 — System */}
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

                {/* Section 2 — Parts */}
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

                {/* Section 3 — Physics Overview */}
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
                                <TableRow cells={['J',       'Impulse (แรงกระตุ้น)',    'J = Δp = m·Δv',              'N·s']} />
                                <TableRow cells={['F',       'แรงกระแทก',              'F = J/Δt',                   'N']} />
                                <TableRow cells={['τ',       'ทอร์กแรงเสียดทาน',       'τ = μ·m·g·r',                'N·m']} />
                                <TableRow cells={['t_spin',  'เวลาหมุน (ประมาณ)',       't = L/τ',                    's']} />
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Section 4 — Angular Momentum */}
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

                {/* Section 5 — Impulse */}
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

                {/* Section 6 — Spin Down */}
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

                {/* Section 7 — Burst */}
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

                {/* Section 8 — Strategy */}
                <section id="strategy" className="bg-[#121826] border border-slate-800 rounded-2xl p-6 space-y-4">
                    <SectionHeader icon={<Zap className="w-5 h-5 text-amber-400" />} title="8. กลยุทธ์การเลือกคอมโบ" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InfoBox color="rose" title="⚔ สาย Attack — โจมตี">
                            เป้าหมาย: Over Finish หรือ X-treme Finish ในรอบแรก
                            เลือก Blade หนัก (ATK สูง) + Ratchet แฉกน้อย (1-3 แฉก) + Bit โจมตี (LF, GF, A)
                            ตัวอย่าง Meta: Phoenix Wing 1-60 LF
                        </InfoBox>
                        <InfoBox color="emerald" title="🌀 สาย Stamina — หมุนนาน">
                            เป้าหมาย: สปินนานกว่าคู่แข่ง ชนะด้วย Spin Finish
                            เลือก Blade k สูง (UX) + Ratchet สมมาตรหรือแฉกมาก (9-60 / 5-60) + Bit Stamina (B, O, FB)
                            ตัวอย่าง Meta: Wizard Rod 9-60 B
                        </InfoBox>
                        <InfoBox color="blue" title="🛡 สาย Defense — ป้องกัน">
                            เป้าหมาย: ดูดซับแรงชน ให้คู่แข่ง Burst หรือ Over Finish เอง
                            เลือก Blade DEF สูง + Ratchet สูง (3-80, 5-80) + Bit ปักหลัก (N, HN, UN)
                            ตัวอย่าง: Leon Crest 5-80 UN
                        </InfoBox>
                        <InfoBox color="violet" title="⚡ สาย Balance — ยืดหยุ่น">
                            เป้าหมาย: รับมือทุกสถานการณ์ใน 3on3
                            เลือก Blade สมดุล + Ratchet กลาง (4-60, 5-60) + Bit Balance (T, GP, TP)
                            ตัวอย่าง: Hells Scythe 4-60 GP
                        </InfoBox>
                    </div>
                </section>

                {/* Section 9 — Series */}
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

                {/* Section 10 — Glossary */}
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

                {/* Footer CTA */}
                <div className="text-center space-y-3 py-6">
                    <p className="text-slate-500 text-sm">ต้องการดูรายการสินค้าทั้งหมด หรือทดสอบสูตรจริง?</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/wiki/products" className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-bold px-6 py-3 rounded-xl transition-all border border-slate-600">
                            <BookOpen className="w-4 h-4" /> รายการสินค้าทั้งหมด
                        </Link>
                        <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-cyan-900/30">
                            <Zap className="w-4 h-4" /> เปิด Combo Simulator
                        </Link>
                    </div>
                </div>

            </main>

            <footer className="border-t border-slate-800 py-4 bg-slate-950 text-center text-xs text-slate-500">
                <p>Beyblade X Wiki ภาษาไทย • ข้อมูลอิงจาก Takara Tomy Standard และ WBO community</p>
            </footer>
        </div>
    );
}
