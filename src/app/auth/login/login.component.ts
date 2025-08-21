
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void { }

  onLogin(): void {
    console.log('Login attempt:', this.username, this.password);
    // Implement authentication logic here
  }
}
