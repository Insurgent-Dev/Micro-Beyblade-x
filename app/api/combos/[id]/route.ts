/**
 * DELETE /api/combos/:id  — ลบ saved combo
 */
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.savedCombo.delete({ where: { id } });
        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('[DELETE /api/combos/:id]', err);
        return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    }
}
