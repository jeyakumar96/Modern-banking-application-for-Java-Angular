import { Routes } from '@angular/router';
import { authGuard, adminGuard, customerGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'admin',
        canActivate: [adminGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadComponent: () => import('./components/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
            },
            {
                path: 'customers',
                loadComponent: () => import('./components/admin/customer-list/customer-list.component').then(m => m.CustomerListComponent)
            },
            {
                path: 'accounts',
                loadComponent: () => import('./components/admin/account-list/account-list.component').then(m => m.AccountListComponent)
            }
        ]
    },
    {
        path: 'customer',
        canActivate: [customerGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadComponent: () => import('./components/customer/customer-dashboard/customer-dashboard.component').then(m => m.CustomerDashboardComponent)
            }
        ]
    }
];
