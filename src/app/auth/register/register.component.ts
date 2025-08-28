import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  nome: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  registrationError: string | null = null;
  registrationSuccess: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  onRegister(): void {
    if (this.password !== this.confirmPassword) {
      this.registrationError = 'As senhas não coincidem.';
      return;
    }

    this.authService.register(this.nome, this.email, this.password).subscribe({
      next: (response) => {
        this.registrationSuccess = 'Usuário registrado com sucesso! Você pode fazer login agora.';
        this.registrationError = null;
        // Optionally, redirect to login page after a short delay
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.registrationError = err.error?.error || 'Erro ao registrar usuário.';
        this.registrationSuccess = null;
      }
    });
  }
}
