export interface Advisor {
    id: number;
    idUser: number;
    rfc: string;
    isIntern: string;
    user: User;
    projects?: (ProjectsEntity)[] | null;
    departments?: (DepartmentsEntity)[] | null;
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
export interface ProjectsEntity {
    id: number;
    keyname: string;
    name: string;
    description: string;
    funding: string;
    dateBegin: string;
    dateEnd?: null;
    companyId: number;
    isFinished: string;
}
export interface DepartmentsEntity {
    id: number;
    codename: string;
    name: string;
}
