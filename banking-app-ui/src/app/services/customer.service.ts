import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { Transaction, TransactionRequest } from '../models/transaction.model';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private apiUrl = 'http://localhost:8080/api/customer';

    constructor(private http: HttpClient) { }

    getMyAccounts(): Observable<Account[]> {
        return this.http.get<Account[]>(`${this.apiUrl}/accounts`);
    }

    getAccountByNumber(accountNumber: string): Observable<Account> {
        return this.http.get<Account>(`${this.apiUrl}/accounts/${accountNumber}`);
    }

    deposit(request: TransactionRequest): Observable<Transaction> {
        return this.http.post<Transaction>(`${this.apiUrl}/transactions/deposit`, request);
    }

    withdraw(request: TransactionRequest): Observable<Transaction> {
        return this.http.post<Transaction>(`${this.apiUrl}/transactions/withdraw`, request);
    }

    transfer(request: TransactionRequest): Observable<Transaction> {
        return this.http.post<Transaction>(`${this.apiUrl}/transactions/transfer`, request);
    }

    getTransactions(accountNumber: string): Observable<Transaction[]> {
        return this.http.get<Transaction[]>(`${this.apiUrl}/transactions/${accountNumber}`);
    }

    getRecentTransactions(accountNumber: string): Observable<Transaction[]> {
        return this.http.get<Transaction[]>(`${this.apiUrl}/transactions/${accountNumber}/recent`);
    }
}
