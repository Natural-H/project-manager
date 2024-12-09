export interface Project {
    id: number;
    keyname: string;
    name: string;
    description: string;
    funding: string;
    dateBegin: string;
    dateEnd?: null;
    companyId: number;
    isFinished: string;
    students: (StudentsEntity)[];
    advisor: (AdvisorEntity)[];
    tools: (ToolsEntity)[];
    company: Company;
}
export interface StudentsEntity {
    id: number;
    idUser: number;
    controlNumber: string;
    projectId: number;
    user: User;
}
export interface User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    middleName: string;
    lastName: string;
    curp: string;
    email: string;
}
export interface AdvisorEntity {
    id: number;
    idUser: number;
    rfc: string;
    isIntern: string;
    user: User;
}
export interface ToolsEntity {
    id: number;
    name: string;
}
export interface Company {
    id: number;
    codename: string;
    name: string;
    size: string;
}
