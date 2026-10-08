import React from 'react';
import Link from 'next/link';
import { ChevronRight, Trophy, Zap, Shield, Users, BookOpen } from 'lucide-react';

function Section({ id, icon, title, children }: {
    id: string; icon: React.ReactNode; title: string; children: React.ReactNode;
}) {
    return (
        <section id={id} className="bg-[#121826] border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">{icon}</div>
                <h2 className="text-xl font-black text-white">{title}</h2>
            </div>
            {children}
        </section>
    );
}

function InfoBox({ color, title, children }: { color: string; title: string; children: React.ReactNode }) {
    const styles: Record<string, string> = {
        cyan:   'bg-cyan-950/40 border-cyan-800/50 text-cyan-300',
        amber:  'bg-amber-950/40 border-amber-800/50 text-amber-300',
        emerald:'bg-emerald-950/40 border-emerald-800/50 text-emerald-300',
        rose:   'bg-rose-950/40 border-rose-800/50 text-rose-300',
        violet: 'bg-violet-950/40 border-violet-800/50 text-violet-300',
    };
    return (
        <div className={`border rounded-xl p-4 text-sm leading-relaxed ${styles[color]}`}>
            <div className="font-bold mb-1">{title}</div>
            {children}
        </div>
    );
}

function ScoreRow({ finish, points, desc }: { finish: string; points: string; desc: string }) {
    return (
        <div className="flex items-start gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
            <span className="font-mono font-black text-amber-400 text-lg w-8 shrink-0">{points}</span>
            <div>
                <div className="font-bold text-white text-sm">{finish}</div>
                <div className="text-xs text-slate-400 mt-0.5">{desc}</div>
            </div>
        </div>
    );
}

export default function HowToPlayPage() {
    return (
        <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans">
            <nav className="border-b border-slate-800 bg-[#121826]/90 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2 text-sm flex-wrap">
                    <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                        <ChevronRight className="w-4 h-4 rotate-180" />หน้าหลัก
                    </Link>
                    <span className="text-slate-700">/</span>
                    <Link href="/wiki" className="text-slate-400 hover:text-white transition-colors">Wiki</Link>
                    <span className="text-slate-700">/</span>
                    <span className="text-white font-bold flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-emerald-400" />วิธีเล่น Beyblade X
                    </span>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">

                {/* Hero */}
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 bg-emerald-950/50 border border-emerald-800/50 text-emerald-400 text-xs font-bold px-4 py-1.5 rounded-full">
                        <BookOpen className="w-3.5 h-3.5" /> คู่มือเริ่มต้น
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        วิธีเล่น <span className="text-emerald-400">Beyblade X</span>
                    </h1>
                    <p className="text-slate-400 text-sm max-w-xl mx-auto">
                        Beyblade X คือ Beyblade รุ่นที่ 4 จาก Takara Tomy เปิดตัวอย่างเป็นทางการ 15 ก.ค. 2566
                        จุดเด่นสูงสุดคือระบบ <strong className="text-white">X-Celerator Rail</strong> ที่ทำให้เบย์พุ่งเร็วกว่าทุกรุ่นที่ผ่านมา
                    </p>
                </div>

                {/* Quick Jump */}
                <div className="bg-[#121826] border border-slate-800 rounded-2xl p-4 flex flex-wrap gap-2 items-center">
                    <span className="text-xs text-slate-500 font-bold">ข้ามไปที่:</span>
                    {[
                        ['#what-is', 'Beyblade X คืออะไร'],
                        ['#equipment', 'อุปกรณ์ที่ต้องมี'],
                        ['#types', 'ประเภทเบย์'],
                        ['#scoring', 'คะแนนและการชนะ'],
                        ['#1v1', 'แบบ 1v1'],
                        ['#3on3', 'แบบ 3on3'],
                        ['#xcelerator', 'X-Celerator Rail'],
                        ['#tips', 'เทคนิคการแข่ง'],
                    ].map(([href, label]) => (
                        <a key={href as string} href={href as string}
                            className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700">
                            {label}
                        </a>
                    ))}
                </div>

                {/* Section 1 */}
                <Section id="what-is" icon={<Zap className="w-5 h-5 text-cyan-400" />} title="Beyblade X คืออะไร?">
                    <p className="text-slate-300 text-sm leading-relaxed">
                        Beyblade X เป็น Beyblade รุ่นที่ 4 ต่อจาก Original (1999), Metal Fight (2008) และ Burst (2015)
                        รุ่นนี้ผสมผสานดีไซน์จากทุกรุ่นที่ผ่านมา: มีโลหะสัมผัส, ระบบล็อก, การปรับความสูง และเน้น <strong className="text-white">ความเร็วสูงสุด</strong>
                    </p>
                    <InfoBox color="cyan" title="จุดเด่นที่แตกต่างจาก Burst">
                        <ul className="space-y-1 mt-1 text-xs">
                            <li>• ไม่มีระบบระเบิดกระจายชิ้นส่วน — ชนะด้วย <strong>Over Finish / X-treme Finish / Spin Finish</strong></li>
                            <li>• ราง <strong>X-Celerator</strong> ในสนามทำให้เบย์เร่งความเร็วได้ 2–3 เท่า</li>
                            <li>• ใช้ <strong>String Launcher</strong> หรือ <strong>Winder Launcher</strong> ดึงเส้นด้าย</li>
                            <li>• ชิ้นส่วน 3 ชิ้น: Blade + Ratchet + Bit (CX = 5 ชิ้น)</li>
                        </ul>
                    </InfoBox>
                </Section>

                {/* Section 2 */}
                <Section id="equipment" icon={<Shield className="w-5 h-5 text-amber-400" />} title="อุปกรณ์ที่ต้องมี">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                        {[
                            { icon: '🌀', title: 'Beyblade X Top', desc: 'ลูกข่างประกอบจาก Blade + Ratchet + Bit ใช้สนาม X Generation เท่านั้น' },
                            { icon: '🎯', title: 'Xtreme Stadium', desc: 'สนามแข่งที่มีราง X-Celerator — ห้ามใช้สนามรุ่นเก่า' },
                            { icon: '🚀', title: 'Launcher', desc: 'String Launcher (เส้นด้าย), Winder Launcher (ไขลาน) หรือ Entry Launcher' },
                        ].map(item => (
                            <div key={item.title} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-center space-y-2">
                                <div className="text-3xl">{item.icon}</div>
                                <div className="font-bold text-white">{item.title}</div>
                                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <InfoBox color="amber" title="ข้อควรระวัง">
                        Beyblade X ใช้ได้เฉพาะกับสนาม X Generation เท่านั้น ห้ามใช้สนาม Burst หรือ Metal Fight
                        เพราะจะทำให้เบย์เสียหายและผลการแข่งขันไม่ถูกต้อง
                    </InfoBox>
                </Section>

                {/* Section 3 */}
                <Section id="types" icon={<Layers className="w-5 h-5 text-violet-400" />} title="ประเภทของเบย์ (Types)">
                    <p className="text-xs text-slate-500 mb-1">หมายเหตุ: เบย์ 1 ลูกสามารถเป็นได้มากกว่า 1 ประเภท และ label อย่างเป็นทางการอาจไม่ตรงกับประสิทธิภาพจริงเสมอไป</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { type: 'Attack',  color: 'rose',   icon: '⚔', desc: 'พุ่งชนคู่แข่งด้วยความเร็วสูง เป้าหมายคือ Over Finish หรือ X-treme Finish ตั้งแต่ช่วงต้น Bit: F, LF, GF, A, LR' },
                            { type: 'Stamina', color: 'emerald',icon: '🌀', desc: 'หมุนได้นานกว่าคู่แข่ง ชนะด้วย Spin Finish รักษาพลังงานหมุน (Angular Momentum L) ให้สูง Bit: B, O, FB, LO' },
                            { type: 'Defense', color: 'blue',   icon: '🛡', desc: 'รับแรงชนโดยไม่หลุดออกสนาม ให้คู่แข่ง Over Finish เอง ปักหลักนิ่ง Bit: N, HN, UN, MN' },
                            { type: 'Balance', color: 'violet', icon: '⚡', desc: 'สมดุลทุกด้าน ปรับรูปแบบการเล่นได้ตามสถานการณ์ เหมาะสำหรับ 3on3 Bit: T, P, GP, G, TP' },
                        ].map(({ type, color, icon, desc }) => {
                            const styles: Record<string, string> = {
                                rose:   'bg-rose-950/40 border-rose-800/40 text-rose-400',
                                emerald:'bg-emerald-950/40 border-emerald-800/40 text-emerald-400',
                                blue:   'bg-blue-950/40 border-blue-800/40 text-blue-400',
                                violet: 'bg-violet-950/40 border-violet-800/40 text-violet-400',
                            };
                            return (
                                <div key={type} className={`border rounded-xl p-4 space-y-1 ${styles[color]}`}>
                                    <div className="font-bold flex items-center gap-2 text-sm">{icon} {type}</div>
                                    <p className="text-xs leading-relaxed opacity-80">{desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </Section>

                {/* Section 4 — Scoring */}
                <Section id="scoring" icon={<Trophy className="w-5 h-5 text-amber-400" />} title="คะแนนและเงื่อนไขการชนะ">
                    <div className="space-y-2">
                        <ScoreRow finish="X-treme Finish" points="2" desc="เบย์คู่แข่งออกทาง X-Celerator Rail — ชนะ 2 คะแนน ทรงพลังที่สุด" />
                        <ScoreRow finish="Over Finish" points="1" desc="เบย์คู่แข่งกระเด็นออกนอกขอบสนาม — ชนะ 1 คะแนน" />
                        <ScoreRow finish="Spin Finish" points="1" desc="เบย์คู่แข่งหมุนหยุดก่อน — ชนะ 1 คะแนน" />
                        <ScoreRow finish="Draw" points="0" desc="หยุดพร้อมกัน หรือออกพร้อมกัน — ไม่มีคะแนน รีแมตช์" />
                    </div>
                    <InfoBox color="emerald" title="เงื่อนไขชนะแมตช์">
                        ผู้เล่นที่ได้ <strong>4 คะแนนก่อน</strong> คือผู้ชนะ
                        ในรูปแบบ 3on3 ใครได้ 4 คะแนนก่อนจากทั้ง 3 เบย์ชนะทั้ง match
                    </InfoBox>
                </Section>

                {/* Section 5 — 1v1 */}
                <Section id="1v1" icon={<Zap className="w-5 h-5 text-cyan-400" />} title="รูปแบบ 1v1">
                    <p className="text-slate-300 text-sm leading-relaxed">
                        ผู้เล่นแต่ละคนใช้เบย์ 1 ลูก แข่งจนฝ่ายใดฝ่ายหนึ่งได้ <strong className="text-white">4 คะแนนก่อน</strong>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 space-y-1">
                            <div className="font-bold text-white">ขั้นตอนการแข่ง</div>
                            <ol className="space-y-1 list-decimal list-inside text-slate-400">
                                <li>ผู้เล่นทั้งสองเตรียมเบย์และ Launcher</li>
                                <li>นับ 3-2-1 ปล่อยเบย์พร้อมกัน</li>
                                <li>รอผลลัพธ์ (X-treme/Over/Spin Finish)</li>
                                <li>บันทึกคะแนน ทำซ้ำจนครบ 4 คะแนน</li>
                            </ol>
                        </div>
                        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 space-y-1">
                            <div className="font-bold text-white">เทคนิคการชู๊ต</div>
                            <ul className="space-y-1 text-slate-400">
                                <li>• ดึง String แรงและเร็วเพื่อ RPM สูง</li>
                                <li>• มุมปล่อย 45° เพิ่มโอกาส X-treme Finish</li>
                                <li>• ปล่อยให้ลงราง X-Celerator เพื่อเร่งความเร็ว</li>
                            </ul>
                        </div>
                    </div>
                </Section>

                {/* Section 6 — 3on3 */}
                <Section id="3on3" icon={<Users className="w-5 h-5 text-violet-400" />} title="รูปแบบ 3on3 (ระบบเด็ค)">
                    <p className="text-slate-300 text-sm leading-relaxed">
                        ผู้เล่นแต่ละคนเตรียมเบย์ 3 ลูกใน Deck Box โดย <strong className="text-white">ปิดบังคู่แข่ง</strong>
                        แล้วใช้เบย์ตามลำดับ 1 → 2 → 3 ใครได้ 4 คะแนนก่อน หรือมีคะแนนมากกว่าเมื่อเบย์ทั้ง 3 หมดก่อน คือผู้ชนะ
                    </p>
                    <InfoBox color="violet" title="กลยุทธ์ 3on3">
                        <ul className="space-y-1 mt-1 text-xs">
                            <li>• ควรมีเบย์ครบ 3 ประเภท: Attack, Stamina/Defense, Balance เพื่อรับมือทุกสถานการณ์</li>
                            <li>• การเลือกลำดับใช้เบย์สำคัญมาก — Attack ก่อนถ้าต้องการ 2 คะแนนเร็ว</li>
                            <li>• ห้ามใช้ชิ้นส่วนซ้ำกันใน 3 ลูก (Blade, Ratchet, Bit ต้องต่างกัน)</li>
                        </ul>
                    </InfoBox>
                </Section>

                {/* Section 7 — X-Celerator */}
                <Section id="xcelerator" icon={<Zap className="w-5 h-5 text-yellow-400" />} title="X-Celerator Rail คืออะไร?">
                    <p className="text-slate-300 text-sm leading-relaxed">
                        X-Celerator Rail คือรางพลาสติกรอบขอบสนาม เมื่อเบย์วิ่งขึ้นราง Bit จะ<strong className="text-white">จับราง</strong>
                        และเร่งความเร็วมหาศาล ก่อนพุ่งออกมาชนคู่แข่งหรือหลุดออกสนาม
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="bg-slate-900/60 border border-yellow-800/30 rounded-xl p-3 text-center">
                            <div className="text-2xl mb-1">⚡</div>
                            <div className="font-bold text-yellow-400">X-treme Finish</div>
                            <div className="text-slate-400 mt-1">เบย์ออกทางราง = 2 คะแนน</div>
                        </div>
                        <div className="bg-slate-900/60 border border-cyan-800/30 rounded-xl p-3 text-center">
                            <div className="text-2xl mb-1">🚀</div>
                            <div className="font-bold text-cyan-400">Attack Combo</div>
                            <div className="text-slate-400 mt-1">Bit Attack ติดรางได้ดี → ความเร็วสูงสุด</div>
                        </div>
                        <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-3 text-center">
                            <div className="text-2xl mb-1">🛡</div>
                            <div className="font-bold text-slate-300">Defense Combo</div>
                            <div className="text-slate-400 mt-1">Bit Defense ไม่ติดราง → ปักหลักนิ่ง</div>
                        </div>
                    </div>
                </Section>

                {/* Section 8 — Tips */}
                <Section id="tips" icon={<Trophy className="w-5 h-5 text-emerald-400" />} title="เทคนิคและคำแนะนำสำหรับมือใหม่">
                    <div className="space-y-3 text-sm text-slate-300">
                        <div className="flex items-start gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                            <span className="text-xl shrink-0">1️⃣</span>
                            <div>
                                <div className="font-bold text-white">เริ่มด้วย BX-01 Dran Sword 3-60F</div>
                                <p className="text-xs text-slate-400 mt-0.5">เป็น Starter Pack มาตรฐาน สมดุลดี ราคาไม่แพง เหมาะสำหรับเรียนรู้ระบบ</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                            <span className="text-xl shrink-0">2️⃣</span>
                            <div>
                                <div className="font-bold text-white">เรียนรู้การควบคุม RPM</div>
                                <p className="text-xs text-slate-400 mt-0.5">ดึง String อย่างรวดเร็วและแรงเพื่อให้ RPM สูง ช่วงที่เหมาะสม 4,000–6,500 RPM</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                            <span className="text-xl shrink-0">3️⃣</span>
                            <div>
                                <div className="font-bold text-white">ฝึกมุมชู๊ตให้เข้าราง X-Celerator</div>
                                <p className="text-xs text-slate-400 mt-0.5">ชู๊ตให้เบย์วิ่งไปโดนรางก่อน แล้วเร่งพุ่งชนคู่แข่ง โอกาส X-treme Finish สูงขึ้น</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                            <span className="text-xl shrink-0">4️⃣</span>
                            <div>
                                <div className="font-bold text-white">ห้ามใช้เบย์ปลอม</div>
                                <p className="text-xs text-slate-400 mt-0.5">เบย์ปลอมน้ำหนักและวัสดุไม่ได้มาตรฐาน อาจทำให้เบย์แท้เสียหายและผลการแข่งขันไม่แน่นอน</p>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Links */}
                <div className="bg-[#121826] border border-slate-800 rounded-2xl p-5 space-y-3">
                    <div className="font-bold text-white">อ่านต่อใน Wiki</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                            ['/wiki/bits',     '⚙ รายการ Bits'],
                            ['/wiki/ratchets', '🔩 รายการ Ratchets'],
                            ['/wiki/cx-parts', '🔧 CX Custom Parts'],
                            ['/wiki/products', '📦 สินค้าทั้งหมด'],
                        ].map(([href, label]) => (
                            <Link key={href as string} href={href as string}
                                className="text-xs text-center py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700">
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="text-center text-xs text-slate-600 py-4">
                    ข้อมูลอ้างอิงจาก beybxdb.com และ Takara Tomy Official Rules
                </div>
            </main>
            <footer className="border-t border-slate-800 py-4 bg-slate-950 text-center text-xs text-slate-500">
                Beyblade X Wiki ภาษาไทย • How to Play Guide
            </footer>
        </div>
    );
}

// ── Layers icon (local use) ────────────────────────────────────────────────────
function Layers({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={className}>
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
        </svg>
    );
}
