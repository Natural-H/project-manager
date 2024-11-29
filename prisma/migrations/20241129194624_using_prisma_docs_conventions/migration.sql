/*
  Warnings:

  - You are about to drop the `advisors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `advisors_departments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `advisors_projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `companies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `companies_advisors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `courses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `departments_` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects_tools` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `students` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `students_courses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `students_project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tools_` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "advisors";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "advisors_departments";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "advisors_projects";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "companies";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "companies_advisors";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "courses";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "departments_";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "projects";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "projects_tools";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "students";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "students_courses";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "students_project";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "tools_";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "users";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "curp" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUser" INTEGER NOT NULL,
    "controlNumber" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "Student_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Student_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Advisor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUser" INTEGER NOT NULL,
    "rfc" TEXT NOT NULL,
    "isIntern" TEXT NOT NULL DEFAULT 'true',
    CONSTRAINT "Advisor_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codename" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codename" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "keyname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "funding" DECIMAL NOT NULL,
    "dateBegin" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateEnd" DATETIME,
    "companiesIdCompany" INTEGER NOT NULL,
    CONSTRAINT "Project_companiesIdCompany_fkey" FOREIGN KEY ("companiesIdCompany") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codename" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tools" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AdvisorToDepartment" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AdvisorToDepartment_A_fkey" FOREIGN KEY ("A") REFERENCES "Advisor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AdvisorToDepartment_B_fkey" FOREIGN KEY ("B") REFERENCES "Department" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AdvisorToCompany" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AdvisorToCompany_A_fkey" FOREIGN KEY ("A") REFERENCES "Advisor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AdvisorToCompany_B_fkey" FOREIGN KEY ("B") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AdvisorToProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AdvisorToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Advisor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AdvisorToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CourseToStudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CourseToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CourseToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProjectToTools" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProjectToTools_A_fkey" FOREIGN KEY ("A") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProjectToTools_B_fkey" FOREIGN KEY ("B") REFERENCES "Tools" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_curp_key" ON "User"("curp");

-- CreateIndex
CREATE UNIQUE INDEX "Student_controlNumber_key" ON "Student"("controlNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Advisor_rfc_key" ON "Advisor"("rfc");

-- CreateIndex
CREATE UNIQUE INDEX "Advisor_idUser_key" ON "Advisor"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "Company_codename_key" ON "Company"("codename");

-- CreateIndex
CREATE UNIQUE INDEX "Course_name_key" ON "Course"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Project_keyname_key" ON "Project"("keyname");

-- CreateIndex
CREATE UNIQUE INDEX "Department_codename_key" ON "Department"("codename");

-- CreateIndex
CREATE UNIQUE INDEX "Tools_name_key" ON "Tools"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_AdvisorToDepartment_AB_unique" ON "_AdvisorToDepartment"("A", "B");

-- CreateIndex
CREATE INDEX "_AdvisorToDepartment_B_index" ON "_AdvisorToDepartment"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AdvisorToCompany_AB_unique" ON "_AdvisorToCompany"("A", "B");

-- CreateIndex
CREATE INDEX "_AdvisorToCompany_B_index" ON "_AdvisorToCompany"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AdvisorToProject_AB_unique" ON "_AdvisorToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_AdvisorToProject_B_index" ON "_AdvisorToProject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToStudent_AB_unique" ON "_CourseToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToStudent_B_index" ON "_CourseToStudent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToTools_AB_unique" ON "_ProjectToTools"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToTools_B_index" ON "_ProjectToTools"("B");
