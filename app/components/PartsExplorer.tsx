'use client';

import React, { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Download } from 'lucide-react';

export type PartRecord = Record<string, string | number>;

export interface PartsData {
    counts: Record<string, number>;
    parts: Record<string, PartRecord[]>;
}

interface CategoryMeta {
    id: string;
    label: string;
    labelTh: string;
    columns: { key: string; label: string }[];
}

const CATEGORIES: CategoryMeta[] = [
    {
        id: 'blades', label: 'Blades', labelTh: 'เบลด', columns: [
            { key: 'name', label: 'ชื่อ' },
            { key: 'spin', label: 'Spin' },
            { key: 'system', label: 'System' },
            { key: 'weight', label: 'น้ำหนัก (g)' },
            { key: 'abbv', label: 'อักษรย่อ' },
        ],
    },
    {
        id: 'bitChips', label: 'Bit Chips', labelTh: 'Lock Chip (CX)', columns: [
            { key: 'name', label: 'ชื่อ' },
            { key: 'spin', label: 'Spin' },
            { key: 'system', label: 'System' },
            { key: 'type', label: 'ประเภท' },
            { key: 'weight', label: 'น้ำหนัก (g)' },
            { key: 'abbv', label: 'อักษรย่อ' },
        ],
    },
    {
        id: 'overBlades', label: 'Over Blades', labelTh: 'Over Blade (CX2)', columns: [
            { key: 'name', label: 'ชื่อ' },
            { key: 'spin', label: 'Spin' },
            { key: 'system', label: 'System' },
            { key: 'weight', label: 'น้ำหนัก (g)' },
            { key: 'abbv', label: 'อักษรย่อ' },
        ],
    },
    {
        id: 'assistBlades', label: 'Assist Blades', labelTh: 'Assist Blade (CX)', columns: [
            { key: 'name', label: 'ชื่อ' },
            { key: 'spin', label: 'Spin' },
            { key: 'system', label: 'System' },
            { key: 'weight', label: 'น้ำหนัก (g)' },
            { key: 'height', label: 'สูง (mm)' },
            { key: 'abbv', label: 'อักษรย่อ' },
        ],
    },
    {
        id: 'rachets', label: 'Ratchets', labelTh: 'แรตเช็ต', columns: [
            { key: 'name', label: 'ชื่อ' },
            { key: 'weight', label: 'น้ำหนัก (g)' },
            { key: 'height', label: 'สูง (mm)' },
            { key: 'type', label: 'ประเภท' },
            { key: 'abbv', label: 'อักษรย่อ' },
        ],
    },
    {
        id: 'bits', label: 'Bits', labelTh: 'บิท', columns: [
            { key: 'name', label: 'ชื่อ' },
            { key: 'weight', label: 'น้ำหนัก (g)' },
            { key: 'height', label: 'สูง (mm)' },
            { key: 'type', label: 'ประเภท' },
            { key: 'abbv', label: 'อักษรย่อ' },
        ],
    },
];

const SPIN_STYLE: Record<string, string> = {
    right: 'text-cyan-400',
    left: 'text-rose-400',
};

const SYSTEM_STYLE: Record<string, string> = {
    BX: 'bg-blue-950/60 text-blue-400 border-blue-800/40',
    BX2: 'bg-blue-950/60 text-blue-300 border-blue-700/40',
    UX: 'bg-violet-950/60 text-violet-400 border-violet-800/40',
    UX2: 'bg-violet-950/60 text-violet-300 border-violet-700/40',
    CX: 'bg-amber-950/60 text-amber-400 border-amber-800/40',
    CX2: 'bg-amber-950/60 text-amber-300 border-amber-700/40',
};

export default function PartsExplorer({ data }: { data: PartsData }) {
    const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0].id);
    const [query, setQuery] = useState('');
    const [systemFilter, setSystemFilter] = useState<string>('ALL');

    const category = CATEGORIES.find(c => c.id === activeCategory)!;
    const rows = data.parts[activeCategory] ?? [];

    const systems = useMemo(() => {
        const set = new Set<string>();
        for (const row of rows) if (typeof row.system === 'string') set.add(row.system);
        return Array.from(set).sort();
    }, [rows]);

    const showSystemFilter = systems.length > 1;

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return rows.filter(row => {
            if (showSystemFilter && systemFilter !== 'ALL' && row.system !== systemFilter) return false;
            if (!q) return true;
            return Object.values(row).some(v => String(v).toLowerCase().includes(q));
        });
    }, [rows, query, systemFilter, showSystemFilter]);

    return (
        <div className="space-y-5">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(c => {
                    const count = data.counts[c.id] ?? 0;
                    const active = c.id === activeCategory;
                    return (
                        <button
                            key={c.id}
                            onClick={() => { setActiveCategory(c.id); setQuery(''); setSystemFilter('ALL'); }}
                            className={`px-3.5 py-2 rounded-xl text-sm font-bold border transition-all flex items-center gap-2 ${
                                active
                                    ? 'bg-cyan-400 text-black border-cyan-300 shadow-md shadow-cyan-500/20'
                                    : 'bg-slate-900/70 text-slate-400 border-slate-700 hover:text-white hover:border-slate-600'
                            }`}
                        >
                            {c.label}
                            <span className={`text-[11px] px-1.5 py-0.5 rounded-md ${active ? 'bg-black/15' : 'bg-slate-800'}`}>
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Title + controls */}
            <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-lg font-bold text-white">
                    {category.labelTh} <span className="text-slate-500 text-sm font-normal">({category.label})</span>
                </h2>
                <span className="text-xs text-slate-500">
                    แสดง {filtered.length} / {rows.length} รายการ
                </span>
                <div className="ml-auto flex flex-wrap items-center gap-2">
                    {showSystemFilter && (
                        <div className="relative">
                            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                            <select
                                value={systemFilter}
                                onChange={e => setSystemFilter(e.target.value)}
                                className="bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-cyan-500"
                            >
                                <option value="ALL">ทุก System</option>
                                {systems.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    )}
                    <div className="relative">
                        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="ค้นหา..."
                            className="bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 w-44"
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-800">
                            {category.columns.map(col => (
                                <th key={col.key} className="px-3 py-2 text-left text-slate-300 font-bold whitespace-nowrap">
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((row, i) => (
                            <tr key={`${row.id ?? row.name}-${i}`} className="border-t border-slate-800 hover:bg-slate-900/50">
                                {category.columns.map(col => {
                                    const value = row[col.key];
                                    if (col.key === 'spin') {
                                        return (
                                            <td key={col.key} className={`px-3 py-2 font-mono text-xs ${SPIN_STYLE[String(value)] ?? 'text-slate-400'}`}>
                                                {String(value)}
                                            </td>
                                        );
                                    }
                                    if (col.key === 'system') {
                                        return (
                                            <td key={col.key} className="px-3 py-2">
                                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${SYSTEM_STYLE[String(value)] ?? 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                                                    {String(value)}
                                                </span>
                                            </td>
                                        );
                                    }
                                    if (col.key === 'weight' || col.key === 'height') {
                                        return (
                                            <td key={col.key} className="px-3 py-2 text-slate-400 font-mono text-xs whitespace-nowrap">
                                                {value === 0 ? <span className="text-slate-600">—</span> : String(value)}
                                            </td>
                                        );
                                    }
                                    return (
                                        <td key={col.key} className="px-3 py-2 text-slate-300 whitespace-nowrap">
                                            {String(value)}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={category.columns.length} className="px-3 py-10 text-center text-slate-500">
                                    ไม่พบรายการที่ตรงกับเงื่อนไข
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end">
                <a
                    href="/data/beybuilder-parts.json"
                    download
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                >
                    <Download className="w-4 h-4" /> ดาวน์โหลดข้อมูล JSON ต้นฉบับ
                </a>
            </div>
        </div>
    );
}
