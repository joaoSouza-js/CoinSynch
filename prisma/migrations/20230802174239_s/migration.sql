/*
  Warnings:

  - You are about to drop the column `symbol` on the `Coin` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Coin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "coinId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "url" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Coin_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Coin" ("amount", "coinId", "id", "name", "ownerId", "url") SELECT "amount", "coinId", "id", "name", "ownerId", "url" FROM "Coin";
DROP TABLE "Coin";
ALTER TABLE "new_Coin" RENAME TO "Coin";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
