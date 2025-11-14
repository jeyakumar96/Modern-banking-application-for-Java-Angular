import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { AuthService } from '../../../services/auth.service';
import { Account } from '../../../models/account.model';
import { Transaction, TransactionRequest } from '../../../models/transaction.model';

@Component({
    selector: 'app-customer-dashboard',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './customer-dashboard.component.html',
    styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {
    accounts: Account[] = [];
    selectedAccount: Account | null = null;
    transactions: Transaction[] = [];
    showDepositModal = false;
    showWithdrawModal = false;
    showTransferModal = false;

    transactionForm: TransactionRequest = {
        accountNumber: '',
        amount: 0,
        toAccountNumber: '',
        description: ''
    };

    constructor(
        private customerService: CustomerService,
        public authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadAccounts();
    }

    loadAccounts(): void {
        this.customerService.getMyAccounts().subscribe({
            next: (accounts) => {
                this.accounts = accounts;
                if (accounts.length > 0) {
                    this.selectAccount(accounts[0]);
                }
            },
            error: (error) => {
                console.error('Error loading accounts:', error);
            }
        });
    }

    selectAccount(account: Account): void {
        this.selectedAccount = account;
        this.loadTransactions(account.accountNumber);
    }

    loadTransactions(accountNumber: string): void {
        this.customerService.getRecentTransactions(accountNumber).subscribe({
            next: (transactions) => {
                this.transactions = transactions;
            },
            error: (error) => {
                console.error('Error loading transactions:', error);
            }
        });
    }

    openDepositModal(): void {
        if (!this.selectedAccount) return;
        this.transactionForm = {
            accountNumber: this.selectedAccount.accountNumber,
            amount: 0,
            description: ''
        };
        this.showDepositModal = true;
    }

    closeDepositModal(): void {
        this.showDepositModal = false;
    }

    deposit(): void {
        this.customerService.deposit(this.transactionForm).subscribe({
            next: () => {
                alert('Deposit successful!');
                this.closeDepositModal();
                this.loadAccounts();
                if (this.selectedAccount) {
                    this.loadTransactions(this.selectedAccount.accountNumber);
                }
            },
            error: (error) => {
                alert('Error: ' + (error.error?.message || 'Deposit failed'));
            }
        });
    }

    openWithdrawModal(): void {
        if (!this.selectedAccount) return;
        this.transactionForm = {
            accountNumber: this.selectedAccount.accountNumber,
            amount: 0,
            description: ''
        };
        this.showWithdrawModal = true;
    }

    closeWithdrawModal(): void {
        this.showWithdrawModal = false;
    }

    withdraw(): void {
        this.customerService.withdraw(this.transactionForm).subscribe({
            next: () => {
                alert('Withdrawal successful!');
                this.closeWithdrawModal();
                this.loadAccounts();
                if (this.selectedAccount) {
                    this.loadTransactions(this.selectedAccount.accountNumber);
                }
            },
            error: (error) => {
                alert('Error: ' + (error.error?.message || 'Withdrawal failed'));
            }
        });
    }

    openTransferModal(): void {
        if (!this.selectedAccount) return;
        this.transactionForm = {
            accountNumber: this.selectedAccount.accountNumber,
            amount: 0,
            toAccountNumber: '',
            description: ''
        };
        this.showTransferModal = true;
    }

    closeTransferModal(): void {
        this.showTransferModal = false;
    }

    transfer(): void {
        this.customerService.transfer(this.transactionForm).subscribe({
            next: () => {
                alert('Transfer successful!');
                this.closeTransferModal();
                this.loadAccounts();
                if (this.selectedAccount) {
                    this.loadTransactions(this.selectedAccount.accountNumber);
                }
            },
            error: (error) => {
                alert('Error: ' + (error.error?.message || 'Transfer failed'));
            }
        });
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
