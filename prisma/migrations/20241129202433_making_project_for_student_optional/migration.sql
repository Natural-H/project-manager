/*
  Warnings:

  - You are about to drop the column `companiesIdCompany` on the `Project` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "keyname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "funding" DECIMAL NOT NULL,
    "dateBegin" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateEnd" DATETIME,
    "companyId" INTEGER NOT NULL,
    CONSTRAINT "Project_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("dateBegin", "dateEnd", "description", "funding", "id", "keyname", "name") SELECT "dateBegin", "dateEnd", "description", "funding", "id", "keyname", "name" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_keyname_key" ON "Project"("keyname");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
