import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  loginFailed = false;

  constructor(private authService: AuthService,private router: Router) {}

   login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // Handle successful login response
        console.log('Logged in:', response);
        
        const sessionExpiryTime:number = Date.now() + 10 * 60 * 1000;

        localStorage.setItem("authToken", response.token);
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("userId", this.username);
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("expiry", sessionExpiryTime.toString());

        if (response?.role === "Admin") {
          this.router.navigate(['/dashboard']);  // <-- or whatever your route is

          // i want to move to sidebar
        } else if (response?.role === "pabna") {
          //alert("You are allowed to login as a student.");
        } 
        else {
        }

      },
      (error) => {
        // Handle failed login
        console.error('Login failed', error);
        this.loginFailed = true;
      }
    );
  }
}