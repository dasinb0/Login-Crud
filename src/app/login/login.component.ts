import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showError = false;
  usuario: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (this.usuario && this.password) {
      if (this.authService.login(this.usuario, this.password)) {
        this.router.navigateByUrl('/lista-personas');
      } else {
        this.showError = true;
      }
    } else {
      this.showError = true;
    }
  }
}
