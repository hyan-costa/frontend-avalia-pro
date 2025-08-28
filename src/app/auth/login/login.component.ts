
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  loginError = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/projetos']);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.loginError = 'Usuário ou senha inválidos.';
      }
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
