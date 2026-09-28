/**
 * extract-beybuilder-parts.mjs
 *
 * แปลงข้อมูลชิ้นส่วน Beyblade X จาก `parts.js` ของโปรเจกต์ BeyBuilder X
 * (Author: Fabel — https://fabelavalon.github.io/BeyBuilderX/ , License: GPL-2.0)
 * ให้เป็นไฟล์ JSON ที่จัดระเบียบ สำหรับใช้เป็นฐานข้อมูลความรู้และการอ้างอิง
 *
 * วิธีใช้:
 *   node scripts/extract-beybuilder-parts.mjs
 *   node scripts/extract-beybuilder-parts.mjs <path/to/parts.js> <path/to/output.json>
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const SRC = process.argv[2] ?? path.join('info', 'beybuilder-x', 'parts.js');
const OUT = process.argv[3] ?? path.join('public', 'data', 'beybuilder-parts.json');

const CATEGORIES = ['bitChips', 'overBlades', 'blades', 'assistBlades', 'rachets', 'bits'];

if (!fs.existsSync(SRC)) {
    console.error(`[extract] ไม่พบไฟล์ต้นทาง: ${SRC}`);
    process.exit(1);
}

const source = fs.readFileSync(SRC, 'utf8');

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(source, sandbox, { filename: SRC });

const parts = {};
const counts = {};
let total = 0;

for (const key of CATEGORIES) {
    const list = sandbox[key];
    if (!Array.isArray(list)) {
        console.error(`[extract] ไม่พบตัวแปร array ชื่อ "${key}" ใน parts.js`);
        process.exit(1);
    }
    parts[key] = list;
    counts[key] = list.length;
    total += list.length;
}

counts.total = total;

const output = {
    $schema: 'beybuilder-x-parts/1',
    source: {
        name: 'BeyBuilder X',
        author: 'Fabel',
        url: 'https://fabelavalon.github.io/BeyBuilderX/',
        repo: 'https://github.com/fabelavalon/BeyBuilderX',
        license: 'GPL-2.0',
        file: 'parts.js',
        note: 'ข้อมูลชิ้นส่วน Beyblade X (น้ำหนักกรัม / ความสูง mm / spin / system) — ใช้เพื่อการอ้างอิงเท่านั้น',
    },
    generatedAt: new Date().toISOString(),
    counts,
    parts,
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(output, null, 2) + '\n', 'utf8');

console.log(`[extract] เขียนข้อมูล ${total} รายการ → ${OUT}`);
for (const key of CATEGORIES) console.log(`  - ${key.padEnd(12)} ${counts[key]}`);
