/**
 * Prisma Client singleton — ป้องกัน hot-reload สร้าง connection ใหม่ซ้ำซ้อน
 * ในโหมด development Next.js จะ reload modules บ่อย ต้องเก็บ instance ไว้ใน globalThis
 */
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql as PrismaLibSQL } from '@prisma/adapter-libsql';
import path from 'node:path';

function createPrismaClient() {
    const url = `file:${path.join(process.cwd(), 'prisma', 'dev.db')}`;
    const adapter = new PrismaLibSQL({ url });
    return new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);
}

const globalForPrisma = globalThis as unknown as {
    prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

export default prisma;
