export interface Transaction {
    id: number;
    transactionId: string;
    type: string;
    amount: number;
    balanceBefore: number;
    balanceAfter: number;
    accountNumber: string;
    toAccountNumber?: string;
    fromAccountNumber?: string;
    description: string;
    transactionDate: string;
}

export interface TransactionRequest {
    accountNumber: string;
    amount: number;
    toAccountNumber?: string;
    description?: string;
}
