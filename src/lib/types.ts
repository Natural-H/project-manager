export interface Student {
    id: number;
    idUser: number;
    controlNumber: string;
    projectId: number;
    user: User;
    project: Project;
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
}

