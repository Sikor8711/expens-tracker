import express from "npm:express";

declare global {
    namespace Express {
        interface Auth {
            id: number;
            first_name: string;
            last_name?: string;
            email: string;
        }

        interface Request {
            auth: Auth;
        }
    }
}
export interface UserPayload {
    id: number;
    first_name: string;
    last_name?: string;
    email: string;
}
export interface User extends UserPayload {
    password: string;
    createdAt?: Date;
}

export interface Login {
    login: boolean;
}

export interface TokenExpiredError {
    name: string;
    message: string;
    expiredAt: Date;
}

export interface UnauthorizedError {
    code: string;
    status: number;
    name: string;
    inner: TokenExpiredError;
}
