import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, Package, Weight, Layers, Cog, CircleDot, CalendarDays, Shield } from 'lucide-react';
import { getProductBySlug, getProductDetails, getBladeImgPath } from '../../../lib/products';
import type { ProductPartDetail } from '../../../lib/products';

interface PartCardProps {
    icon: React.ReactNode;
    title: string;
    part: ProductPartDetail | null;
    accent: string;
    missing: string;
}

function PartCard({ icon, title, part, accent, missing }: PartCardProps) {
    return (
        <div className="bg-[#121826] border border-slate-800 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${accent}`}>{icon}</span>
                <span className="font-bold text-slate-200">{title}</span>
            </div>
            {part ? (
                <>
                    <div className="flex items-end justify-between gap-2">
                        <div>
                            <div className="font-black text-white">{part.name}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{part.type}</div>
                        </div>
                        <div className="flex items-center gap-1.5 text-yellow-400 font-black whitespace-nowrap">
                            <Weight className="w-4 h-4" />
                            {part.weight !== null ? `${part.weight} g` : '—'}
                        </div>
                    </div>
                    {part.desc && <p className="text-xs text-slate-400 leading-relaxed">{part.desc}</p>}
                </>
            ) : (
                <p className="text-xs text-slate-500">{missing}</p>
            )}
        </div>
    );
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) notFound();

    const details = getProductDetails(product.name);
    const bladeImg = details.blade ? getBladeImgPath(details.blade.name, slug) : null;
    const totalWeight =
        (details.blade?.weight ?? 0) +
        (details.ratchet?.weight ?? 0) +
        (details.bit?.weight ?? 0);

    return (
        <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans">

            <nav className="border-b border-slate-800 bg-[#121826]/90 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2 text-sm">
                    <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                        <ChevronRight className="w-4 h-4 rotate-180" /> หน้าหลัก
                    </Link>
                    <span className="text-slate-700">/</span>
                    <Link href="/wiki" className="text-slate-400 hover:text-white transition-colors">Wiki</Link>
                    <span className="text-slate-700">/</span>
                    <Link href="/wiki/products" className="text-slate-400 hover:text-white transition-colors">รายการสินค้า</Link>
                    <span className="text-slate-700">/</span>
                    <span className="text-white font-bold flex items-center gap-1.5 truncate">
                        <Package className="w-4 h-4 text-cyan-400" /> {product.name}
                    </span>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="shrink-0 w-full md:w-72">
                        <div className="relative aspect-square rounded-2xl border border-slate-800 bg-[#121826] overflow-hidden">
                            {bladeImg ? (
                                <Image
                                    src={bladeImg}
                                    alt={details.blade?.name ?? product.name}
                                    fill
                                    className="object-contain p-6 drop-shadow-2xl"
                                    sizes="288px"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Package className="w-20 h-20 text-slate-700" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 space-y-5">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 text-xs font-bold px-4 py-1.5 rounded-full">
                                <Package className="w-3.5 h-3.5" /> {product.code}
                            </div>
                            <h1 className="mt-3 text-3xl font-black text-white">{product.name}</h1>
                            <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                                <CalendarDays className="w-4 h-4" /> วางจำหน่าย: {product.releaseDate}
                            </p>
                            {product.note && (
                                <span className="mt-3 inline-block text-xs font-bold text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded">
                                    {product.note}
                                </span>
                            )}
                        </div>

                        {details.blade && (
                            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-sm">
                                <div className="flex items-center gap-1.5 font-bold text-cyan-400">
                                    <Shield className="w-4 h-4" /> น้ำหนักรวมประมาณการ
                                </div>
                                <div className="mt-1 text-3xl font-black text-white">
                                    {totalWeight.toFixed(1)} <span className="text-base text-slate-400 font-medium">g</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <PartCard
                        icon={<Layers className="w-4 h-4" />}
                        title="เบลด (Blade)"
                        part={details.blade}
                        accent="bg-cyan-950/60 text-cyan-400"
                        missing="ไม่มีข้อมูลชิ้นส่วนเบลด"
                    />
                    <PartCard
                        icon={<Cog className="w-4 h-4" />}
                        title="ราทเช็ต (Ratchet)"
                        part={details.ratchet}
                        accent="bg-amber-950/60 text-amber-400"
                        missing="ไม่มีข้อมูลราทเช็ต"
                    />
                    <PartCard
                        icon={<CircleDot className="w-4 h-4" />}
                        title="บิท (Bit)"
                        part={details.bit}
                        accent="bg-violet-950/60 text-violet-400"
                        missing="ไม่มีข้อมูลบิท"
                    />
                </div>

                <Link
                    href="/wiki/products"
                    className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors border border-slate-800 rounded-lg px-4 py-2"
                >
                    <ChevronRight className="w-4 h-4 rotate-180" /> กลับไปรายการสินค้า
                </Link>

            </main>

            <footer className="border-t border-slate-800 py-4 bg-slate-950 text-center text-xs text-slate-500">
                <p>Beyblade X Wiki ภาษาไทย • ข้อมูลอ้างอิงจาก Takara Tomy Standard และ beyblade.wiki</p>
            </footer>
        </div>
    );
}