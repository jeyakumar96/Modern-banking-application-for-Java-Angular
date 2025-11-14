export interface Account {
    id: number;
    accountNumber: string;
    accountType: string;
    balance: number;
    active: boolean;
    userName: string;
    userFullName: string;
    createdAt: string;
}

export interface AccountRequest {
    userId: number;
    accountType: 'SAVINGS' | 'CURRENT';
}
