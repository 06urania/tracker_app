import { Component } from '@angular/core';
import { AuthService } from '../../firebase/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async register() {
    try {
      await this.authService.register(this.email, this.password);
      alert('Usuario registrado con éxito');
      this.router.navigate(['/home']); // Redirige al home después del registro
    } catch (error) {
      console.error(error);
      alert('Error al registrar el usuario');
    }
  }
}
