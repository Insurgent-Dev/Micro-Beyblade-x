-- CreateTable
CREATE TABLE "Blade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "series" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "atk" INTEGER NOT NULL,
    "def" INTEGER NOT NULL,
    "sta" INTEGER NOT NULL,
    "inertiaFactor" REAL NOT NULL,
    "desc" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Ratchet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "height" REAL NOT NULL,
    "sides" INTEGER NOT NULL,
    "weight" REAL NOT NULL,
    "atk" INTEGER NOT NULL,
    "def" INTEGER NOT NULL,
    "sta" INTEGER NOT NULL,
    "bst" INTEGER NOT NULL,
    "desc" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Bit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "speed" INTEGER NOT NULL,
    "atk" INTEGER NOT NULL,
    "def" INTEGER NOT NULL,
    "sta" INTEGER NOT NULL,
    "bst" INTEGER NOT NULL,
    "burstResist" INTEGER NOT NULL,
    "desc" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SavedCombo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'My Combo',
    "system" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bladeId" TEXT NOT NULL,
    "ratchetId" TEXT NOT NULL,
    "bitId" TEXT NOT NULL,
    "rpm" REAL NOT NULL DEFAULT 5500,
    "linearSpeed" REAL NOT NULL DEFAULT 3.5,
    "angleDeg" REAL NOT NULL DEFAULT 45,
    "totalKE" REAL NOT NULL DEFAULT 0,
    "impactForce" REAL NOT NULL DEFAULT 0,
    "angularMomentum" REAL NOT NULL DEFAULT 0,
    "burstRiskLevel" TEXT NOT NULL DEFAULT 'moderate',
    "notes" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "SavedCombo_bladeId_fkey" FOREIGN KEY ("bladeId") REFERENCES "Blade" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SavedCombo_ratchetId_fkey" FOREIGN KEY ("ratchetId") REFERENCES "Ratchet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SavedCombo_bitId_fkey" FOREIGN KEY ("bitId") REFERENCES "Bit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WikiArticle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "WikiArticle_slug_key" ON "WikiArticle"("slug");
