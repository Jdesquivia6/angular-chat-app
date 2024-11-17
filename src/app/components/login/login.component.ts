import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    if (!this.username.trim() || !this.password.trim()) {
      this.loginError =
        'El nombre de usuario y la contraseña son obligatorios.';
      return;
    }

    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        if (response) {
          console.log('Login exitoso:', response);

          localStorage.setItem('userId', response);

          this.router.navigate(['/select-user']);
        } else {
          console.warn('Respuesta inesperada del servidor:', response);
          this.loginError = 'No se pudo iniciar sesión. Intente nuevamente.';
        }
      },
      (error: any) => {
        console.error('Error al iniciar sesión:', error);
        this.loginError = 'Usuario o contraseña incorrectos.';
      }
    );
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
