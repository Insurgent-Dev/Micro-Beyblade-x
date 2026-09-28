# แผนจัดสร้าง Wiki — Micro-Beyblade-x

อัปเดตล่าสุด: 2026-09-18

## 1. เพจที่มีอยู่แล้ว (app/wiki/)

| Route | ไฟล์ | สถานะ |
|-------|------|--------|
| `/wiki` | `app/wiki/page.tsx` | hub + สารบัญหลัก |
| `/wiki/blades` | `app/wiki/blades/page.tsx` | รายการ Blade |
| `/wiki/bits` | `app/wiki/bits/page.tsx` | รายการ Bit (การ์ด + กรองสาย/ซีรีส์) |
| `/wiki/ratchets` | `app/wiki/ratchets/page.tsx` | รายการ Ratchet |
| `/wiki/cx-parts` | `app/wiki/cx-parts/page.tsx` | ชิ้นส่วน CX |
| `/wiki/how-to-play` | `app/wiki/how-to-play/page.tsx` | วิธีเล่น |
| `/wiki/products` | `app/wiki/products/page.tsx` | รายการสินค้า |

## 2. แหล่งข้อมูล

- `app/lib/parts-db.ts` — ชุดข้อมูลชิ้นส่วนแบบ static (มี type/สถิติ)
- `public/data/beybuilder-parts.json` — ฐานข้อมูลอ้างอิง 275 รายการ (จาก BeyBuilder X)
- รูปภาพ: `public/bit/bits/`, `public/blade/`, `public/ratchet/`, `public/assistblade/`, `public/overblade/`, `public/lockchip/`
- `scripts/extract-beybuilder-parts.mjs` — สร้าง JSON ใหม่จาก `info/beybuilder-x/parts.js`

## 3. แผนดำเนินการ (ทำทีละสาย)

### Phase 1 — Bit (`/wiki/bits`) ← กำลังทำ
- เพิ่มรูปที่มีในโฟลเดอร์แต่ยังไม่มีในรายการ (13 ตัว)
- แก้รายการที่อ้างรูปซึ่งไฟล์จริงไม่มี (แสดงอักษรย่อแทน)
- แก้ชื่อไฟล์ที่มีเว้นวรรคซ้อนให้ตรงกับไฟล์จริง
- จัดกลุ่มแสดงผลตามสาย: Attack / Stamina / Defense / Balance

### Phase 2 — Ratchet (`/wiki/ratchets`)
- ตรวจรูปใน `public/ratchet/` เทียบกับรายการ
- จัดกลุ่มตามจำนวนแฉก / ความสูง

### Phase 3 — Blade (`/wiki/blades`)
- ตรวจรูปใน `public/blade/` เทียบกับรายการ
- จัดกลุ่มตามซีรีส์ BX / UX / CX

### Phase 4 — CX Parts (`/wiki/cx-parts`)
- Lock Chip / Assist Blade / Over Blade

## 4. หลักการ

- ใช้ข้อเท็จจริงจากไฟล์/ข้อมูลจริงเท่านั้น ไม่เดา
- เพิ่ม/แก้ข้อมูลแล้วอัปเดตตารางนี้เสมอ
