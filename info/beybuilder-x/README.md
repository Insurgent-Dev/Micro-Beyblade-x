# BeyBuilder X — ข้อมูลชิ้นส่วน (Source)

ข้อมูลต้นทางสำหรับฐานข้อมูลอ้างอิงชิ้นส่วน Beyblade X ในโปรเจกต์นี้

## ที่มา / Credit

- **ชื่อโปรเจกต์:** BeyBuilder X — Beyblade stat tracker and random build generator
- **ผู้สร้าง:** Fabel
- **เว็บ:** https://fabelavalon.github.io/BeyBuilderX/
- **Repo:** https://github.com/fabelavalon/BeyBuilderX
- **License:** GNU General Public License v2.0 (ดู `LICENSE` ในโฟลเดอร์นี้)
- **Copyright:** 2023–2026 Fabel

## ไฟล์ในโฟลเดอร์นี้

| ไฟล์ | รายละเอียด |
|------|------------|
| `parts.js` | ไฟล์ต้นฉบับ (คัดลอกมาจาก `BeyBuilderX-main.zip` ใน `info/`) |
| `LICENSE` | สัญญาอนุญาต GPL-2.0 ของโปรเจกต์ต้นทาง |

## หมวดข้อมูลใน `parts.js`

| ตัวแปร | จำนวน | คำอธิบาย |
|--------|-------|----------|
| `bitChips` | 26 | Lock Chip ของระบบ CX |
| `overBlades` | 7 | Over Blade ของระบบ CX2 |
| `blades` | 132 | เบลดทุกซีรีส์ (BX / UX / CX / BX2 / UX2 / CX2) |
| `assistBlades` | 21 | Assist Blade ของระบบ CX |
| `rachets` | 36 | Ratchet (ratchet / simple) |
| `bits` | 53 | Bit (bit / ratchetBit) |
| **รวม** | **275** | |

แต่ละรายการมี: `name`, `spin`, `system`, `type`, `weight` (กรัม), `height` (mm), `abbv`

## วิธีสร้างไฟล์ JSON

```bash
node scripts/extract-beybuilder-parts.mjs
```

ผลลัพธ์จะถูกเขียนไปที่ `public/data/beybuilder-parts.json`
(และให้เครดิตที่มาไว้ในฟิลด์ `source` ของ JSON แล้ว)
