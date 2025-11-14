import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/user.model';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    credentials: LoginRequest = {
        username: '',
        password: ''
    };
    errorMessage = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    onSubmit(): void {
        this.errorMessage = '';
        this.authService.login(this.credentials).subscribe({
            next: (response) => {
                if (response.role === 'ADMIN') {
                    this.router.navigate(['/admin/dashboard']);
                } else {
                    this.router.navigate(['/customer/dashboard']);
                }
            },
            error: (error) => {
                this.errorMessage = 'Invalid username or password';
                console.error('Login error:', error);
            }
        });
    }
}
