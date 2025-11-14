import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account, AccountRequest } from '../models/account.model';
import { Transaction, TransactionRequest } from '../models/transaction.model';
import { User, RegisterRequest } from '../models/user.model';
import { DashboardStats } from '../models/dashboard.model';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private apiUrl = 'http://localhost:8080/api/admin';

    constructor(private http: HttpClient) { }

    getDashboardStats(): Observable<DashboardStats> {
        return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard/stats`);
    }

    getAllCustomers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/customers`);
    }

    getCustomerById(id: number): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/customers/${id}`);
    }

    registerCustomer(request: RegisterRequest): Observable<User> {
        // Backend mapping expects POST /api/admin/customers/register
        return this.http.post<User>(`${this.apiUrl}/customers/register`, request);
    }


    createAccount(request: AccountRequest): Observable<Account> {
        return this.http.post<Account>(`${this.apiUrl}/accounts`, request);
    }

    getAllAccounts(): Observable<Account[]> {
        return this.http.get<Account[]>(`${this.apiUrl}/accounts`);
    }

    getAccountsByUserId(userId: number): Observable<Account[]> {
        return this.http.get<Account[]>(`${this.apiUrl}/accounts/user/${userId}`);
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

    getTransactions(accountNumber: string): Observable<Transaction[]> {
        return this.http.get<Transaction[]>(`${this.apiUrl}/transactions/${accountNumber}`);
    }
}
