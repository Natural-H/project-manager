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
    "isFinished" TEXT NOT NULL DEFAULT 'true',
    CONSTRAINT "Project_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("companyId", "dateBegin", "dateEnd", "description", "funding", "id", "keyname", "name") SELECT "companyId", "dateBegin", "dateEnd", "description", "funding", "id", "keyname", "name" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_keyname_key" ON "Project"("keyname");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
