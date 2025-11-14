import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';
import { DashboardStats } from '../../../models/dashboard.model';
import { User, RegisterRequest } from '../../../models/user.model';
import { AccountRequest } from '../../../models/account.model';
import { TransactionRequest } from '../../../models/transaction.model';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
    stats: DashboardStats | null = null;
    customers: User[] = [];
    showCustomerModal = false;
    showAccountModal = false;
    showTransactionModal = false;
    selectedCustomerId: number | null = null;
    transactionType: 'deposit' | 'withdraw' = 'deposit';

    customerForm: RegisterRequest = {
        username: '',
        email: '',
        password: '',
        fullName: '',
        phoneNumber: ''
    };

    accountForm: AccountRequest = {
        userId: 0,
        accountType: 'SAVINGS'
    };

    transactionForm: TransactionRequest = {
        accountNumber: '',
        amount: 0,
        description: ''
    };

    constructor(
        private adminService: AdminService,
        public authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadDashboardStats();
        this.loadCustomers();
    }

    loadDashboardStats(): void {
        this.adminService.getDashboardStats().subscribe({
            next: (stats) => {
                this.stats = stats;
            },
            error: (error: any) => {
                console.error('Error loading stats:', error);
            }
        });
    }

    loadCustomers(): void {
        this.adminService.getAllCustomers().subscribe({
            next: (customers) => {
                this.customers = customers;
            },
            error: (error: any) => {
                console.error('Error loading customers:', error);
            }
        });
    }

    openCustomerModal(): void {
        this.showCustomerModal = true;
        this.resetCustomerForm();
    }

    closeCustomerModal(): void {
        this.showCustomerModal = false;
    }

    resetCustomerForm(): void {
        this.customerForm = {
            username: '',
            email: '',
            password: '',
            fullName: '',
            phoneNumber: ''
        };
    }

    createCustomer(): void {
        this.adminService.registerCustomer(this.customerForm).subscribe({
            next: () => {
                alert('Customer created successfully!');
                this.closeCustomerModal();
                this.loadCustomers();
            },
            error: (error: any) => {
                alert('Error creating customer: ' + (error.error?.message || 'Unknown error'));
            }
        });
    }

    openAccountModal(userId: number): void {
        this.accountForm.userId = userId;
        this.showAccountModal = true;
    }

    closeAccountModal(): void {
        this.showAccountModal = false;
    }

    createAccount(): void {
        this.adminService.createAccount(this.accountForm).subscribe({
            next: () => {
                alert('Account created successfully!');
                this.closeAccountModal();
                this.loadDashboardStats();
            },
            error: (error: any) => {
                alert('Error creating account: ' + (error.error?.message || 'Unknown error'));
            }
        });
    }

    openTransactionModal(type: 'deposit' | 'withdraw'): void {
        this.transactionType = type;
        this.showTransactionModal = true;
        this.transactionForm = {
            accountNumber: '',
            amount: 0,
            description: ''
        };
    }

    closeTransactionModal(): void {
        this.showTransactionModal = false;
    }

    processTransaction(): void {
        const service = this.transactionType === 'deposit'
            ? this.adminService.deposit(this.transactionForm)
            : this.adminService.withdraw(this.transactionForm);

        service.subscribe({
            next: () => {
                alert(`${this.transactionType} successful!`);
                this.closeTransactionModal();
                this.loadDashboardStats();
            },
            error: (error: any) => {
                alert(`Error: ${error.error?.message || 'Transaction failed'}`);
            }
        });
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
