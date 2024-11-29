-- CreateTable
CREATE TABLE "users" (
    "idUser" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "curp" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "students" (
    "idStudent" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUser" INTEGER NOT NULL,
    "controlNumber" TEXT NOT NULL,
    CONSTRAINT "students_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "advisors" (
    "idAdvisor" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUser" INTEGER NOT NULL,
    "rfc" TEXT NOT NULL,
    "isIntern" TEXT NOT NULL DEFAULT 'true',
    CONSTRAINT "advisors_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "companies" (
    "idCompany" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codename" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "courses" (
    "idCourse" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codename" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "projects" (
    "idProject" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "keyname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "funding" DECIMAL NOT NULL,
    "dateBegin" DATETIME NOT NULL,
    "dateEnd" DATETIME
);

-- CreateTable
CREATE TABLE "departments_" (
    "idDepartment" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codename" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "advisors_departments" (
    "idAdvisorDepartment" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idAdvisor" INTEGER NOT NULL,
    "idDepartment" INTEGER NOT NULL,
    CONSTRAINT "advisors_departments_idAdvisor_fkey" FOREIGN KEY ("idAdvisor") REFERENCES "advisors" ("idAdvisor") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "advisors_departments_idDepartment_fkey" FOREIGN KEY ("idDepartment") REFERENCES "departments_" ("idDepartment") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "advisors_projects" (
    "idAdvisorProject" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idAdvisor" INTEGER NOT NULL,
    "idProject" INTEGER NOT NULL,
    CONSTRAINT "advisors_projects_idAdvisor_fkey" FOREIGN KEY ("idAdvisor") REFERENCES "advisors" ("idAdvisor") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "advisors_projects_idProject_fkey" FOREIGN KEY ("idProject") REFERENCES "projects" ("idProject") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "companies_advisors" (
    "idCompanyAdvisor" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idCompany" INTEGER NOT NULL,
    "idAdvisor" INTEGER NOT NULL,
    CONSTRAINT "companies_advisors_idCompany_fkey" FOREIGN KEY ("idCompany") REFERENCES "companies" ("idCompany") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "companies_advisors_idAdvisor_fkey" FOREIGN KEY ("idAdvisor") REFERENCES "advisors" ("idAdvisor") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "students_courses" (
    "idStudentCourse" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idStudent" INTEGER NOT NULL,
    "idCourse" INTEGER NOT NULL,
    CONSTRAINT "students_courses_idStudent_fkey" FOREIGN KEY ("idStudent") REFERENCES "students" ("idStudent") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "students_courses_idCourse_fkey" FOREIGN KEY ("idCourse") REFERENCES "courses" ("idCourse") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tools_" (
    "idTool" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "students_project" (
    "idStudentProject" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idStudent" INTEGER NOT NULL,
    "idProject" INTEGER NOT NULL,
    CONSTRAINT "students_project_idStudent_fkey" FOREIGN KEY ("idStudent") REFERENCES "students" ("idStudent") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "students_project_idProject_fkey" FOREIGN KEY ("idProject") REFERENCES "projects" ("idProject") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "projects_tools" (
    "idProjectTool" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idProject" INTEGER NOT NULL,
    "idTool" INTEGER NOT NULL,
    CONSTRAINT "projects_tools_idProject_fkey" FOREIGN KEY ("idProject") REFERENCES "projects" ("idProject") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "projects_tools_idTool_fkey" FOREIGN KEY ("idTool") REFERENCES "tools_" ("idTool") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_curp_key" ON "users"("curp");

-- CreateIndex
CREATE UNIQUE INDEX "students_controlNumber_key" ON "students"("controlNumber");

-- CreateIndex
CREATE UNIQUE INDEX "advisors_rfc_key" ON "advisors"("rfc");

-- CreateIndex
CREATE UNIQUE INDEX "advisors_idUser_key" ON "advisors"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "companies_codename_key" ON "companies"("codename");

-- CreateIndex
CREATE UNIQUE INDEX "courses_name_key" ON "courses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "projects_keyname_key" ON "projects"("keyname");

-- CreateIndex
CREATE UNIQUE INDEX "departments__codename_key" ON "departments_"("codename");

-- CreateIndex
CREATE UNIQUE INDEX "advisors_departments_idAdvisor_idDepartment_key" ON "advisors_departments"("idAdvisor", "idDepartment");

-- CreateIndex
CREATE UNIQUE INDEX "advisors_projects_idAdvisor_idProject_key" ON "advisors_projects"("idAdvisor", "idProject");

-- CreateIndex
CREATE UNIQUE INDEX "companies_advisors_idAdvisor_idCompany_key" ON "companies_advisors"("idAdvisor", "idCompany");

-- CreateIndex
CREATE UNIQUE INDEX "students_courses_idStudent_idCourse_key" ON "students_courses"("idStudent", "idCourse");

-- CreateIndex
CREATE UNIQUE INDEX "tools__name_key" ON "tools_"("name");

-- CreateIndex
CREATE UNIQUE INDEX "students_project_idStudent_key" ON "students_project"("idStudent");

-- CreateIndex
CREATE UNIQUE INDEX "projects_tools_idProject_idTool_key" ON "projects_tools"("idProject", "idTool");
