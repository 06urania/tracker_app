import { Component } from '@angular/core';
import { AuthService } from '../../firebase/auth.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../../firebase/firestore.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private firestoreService: FirestoreService
  ) {}

  async register() {
    if (!this.name || !this.email || !this.password) {
      alert('Por favor, complete todos los campos');
      return;
    }

    try {
      const userCredential = await this.authService.register(
        this.email,
        this.password
      );

      const userData = {
        uid: userCredential.user.uid,
        name: this.name,
        email: this.email,
      };

      await this.firestoreService.createUser(userCredential.user.uid, userData);

      alert('Usuario registrado con éxito');
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Error durante el registro:', error);
      if (error.code === 'auth/email-already-in-use') {
        alert('Este correo ya está registrado');
      } else {
        const errorMessage = this.authService.GenerarError(error);
        alert(errorMessage);
      }
    }
  }
}
