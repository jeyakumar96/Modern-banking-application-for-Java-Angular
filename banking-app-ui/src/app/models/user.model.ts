export interface User {
    id: number;
    username: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    role: string;
    active: boolean;
    createdAt: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    tokenType: string;
    username: string;
    email: string;
    fullName: string;
    role: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    fullName: string;
    phoneNumber: string;
}
