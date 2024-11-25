import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private auth: Auth,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  async login() {
    try {
      // Intenta iniciar sesión con el correo electrónico y la contraseña
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );

      // Si el inicio de sesión es exitoso, redirige al usuario
      this.router.navigate(['/tracker']); // Ajusta la ruta según tu aplicación
    } catch (error: any) {
      // Manejo de errores
      this.handleError(error.code);
    }
  }

  // Método para mostrar una alerta en caso de error
  private async handleError(errorCode: string) {
    let message = '';

    switch (errorCode) {
      case 'auth/invalid-email':
        message = 'El correo electrónico ingresado no es válido.';
        break;
      case 'auth/user-disabled':
        message = 'La cuenta está deshabilitada. Contacta al soporte.';
        break;
      case 'auth/user-not-found':
        message = 'No se encontró una cuenta con este correo electrónico.';
        break;
      case 'auth/wrong-password':
        message = 'La contraseña ingresada es incorrecta.';
        break;
      default:
        message = 'Ocurrió un error inesperado. Por favor, intenta de nuevo.';
        break;
    }

    const alert = await this.alertController.create({
      header: 'Error',
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
