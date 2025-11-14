import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-container">
      <header class="header">
        <div class="header-content">
          <h1>KANINI BANK - Customers</h1>
          <div class="header-actions">
            <button class="btn btn-secondary" (click)="logout()">Logout</button>
          </div>
        </div>
      </header>

      <nav class="nav-tabs">
        <a routerLink="/admin/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/admin/customers" routerLinkActive="active">Customers</a>
        <a routerLink="/admin/accounts" routerLinkActive="active">Accounts</a>
      </nav>

      <main class="main-content">
        <div class="customers-section">
          <h2>All Customers</h2>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let customer of customers">
                  <td>{{ customer.id }}</td>
                  <td>{{ customer.fullName }}</td>
                  <td>{{ customer.username }}</td>
                  <td>{{ customer.email }}</td>
                  <td>{{ customer.phoneNumber }}</td>
                  <td>
                    <span class="badge" [class.active]="customer.active" [class.inactive]="!customer.active">
                      {{ customer.active ? 'Active' : 'Inactive' }}
                    </span>
                  </td>
                  <td>{{ customer.createdAt | date:'short' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .admin-container {
      min-height: 100vh;
      background: #f3f4f6;
    }

    .header {
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 1rem 2rem;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      margin: 0;
      color: #1f2937;
      font-size: 1.5rem;
    }

    .nav-tabs {
      background: white;
      padding: 0 2rem;
      display: flex;
      gap: 2rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .nav-tabs a {
      padding: 1rem 0;
      color: #6b7280;
      text-decoration: none;
      border-bottom: 2px solid transparent;
      transition: all 0.3s;

      &.active {
        color: #2563eb;
        border-bottom-color: #2563eb;
      }
    }

    .main-content {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 2rem;
    }

    .btn {
      padding: 0.5rem 1.5rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s;

      &.btn-secondary {
        background: #6b7280;
        color: white;

        &:hover {
          background: #4b5563;
        }
      }
    }

    .table-container {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;

      th, td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #e5e7eb;
      }

      th {
        background: #f9fafb;
        font-weight: 600;
        color: #374151;
      }

      tbody tr:hover {
        background: #f9fafb;
      }
    }

    .badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;

      &.active {
        background: #d1fae5;
        color: #065f46;
      }

      &.inactive {
        background: #fee2e2;
        color: #dc2626;
      }
    }
  `]
})
export class CustomerListComponent implements OnInit {
  customers: User[] = [];

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.adminService.getAllCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
      },
      error: (error) => {
        console.error('Error loading customers:', error);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
