/**
 * GET  /api/combos        — ดึง saved combos ทั้งหมด (ล่าสุด 20 รายการ)
 * POST /api/combos        — บันทึก combo ใหม่พร้อม physics snapshot
 */
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

// ── GET ───────────────────────────────────────────────────────────────────────
export async function GET() {
    try {
        const combos = await prisma.savedCombo.findMany({
            orderBy: { createdAt: 'desc' },
            take: 20,
            include: {
                blade:   { select: { id: true, name: true, series: true, weight: true } },
                ratchet: { select: { id: true, name: true, sides: true, height: true } },
                bit:     { select: { id: true, name: true, type: true } },
            },
        });
        return NextResponse.json({ ok: true, data: combos });
    } catch (err) {
        console.error('[GET /api/combos]', err);
        return NextResponse.json({ ok: false, error: 'Failed to fetch combos' }, { status: 500 });
    }
}

// ── POST ──────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as {
            name?: string;
            system: string;
            bladeId: string;
            ratchetId: string;
            bitId: string;
            rpm: number;
            linearSpeed: number;
            angleDeg: number;
            totalKE: number;
            impactForce: number;
            angularMomentum: number;
            burstRiskLevel: string;
            notes?: string;
        };

        const { name, system, bladeId, ratchetId, bitId,
                rpm, linearSpeed, angleDeg,
                totalKE, impactForce, angularMomentum, burstRiskLevel,
                notes } = body;

        // ตรวจสอบ parts ว่ามีอยู่ใน DB
        const [blade, ratchet, bit] = await Promise.all([
            prisma.blade.findUnique({ where: { id: bladeId } }),
            prisma.ratchet.findUnique({ where: { id: ratchetId } }),
            prisma.bit.findUnique({ where: { id: bitId } }),
        ]);

        if (!blade || !ratchet || !bit) {
            return NextResponse.json(
                { ok: false, error: 'Part not found — seed the DB first (/api/seed)' },
                { status: 404 }
            );
        }

        const saved = await prisma.savedCombo.create({
            data: {
                name:            name ?? `${blade.name} ${ratchet.name}${bit.id}`,
                system,
                bladeId,
                ratchetId,
                bitId,
                rpm,
                linearSpeed,
                angleDeg,
                totalKE,
                impactForce,
                angularMomentum,
                burstRiskLevel:  burstRiskLevel ?? 'moderate',
                notes:           notes ?? '',
            },
        });

        return NextResponse.json({ ok: true, data: saved }, { status: 201 });
    } catch (err) {
        console.error('[POST /api/combos]', err);
        return NextResponse.json({ ok: false, error: 'Failed to save combo' }, { status: 500 });
    }
}
