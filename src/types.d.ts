export interface User {
    id?: number;
    first_name: string;
    last_name?: string;
    email: string;
    password: string;
    createdAt?: Date;
}

export interface Login {
    login: boolean;
}
