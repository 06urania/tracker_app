import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/firebase/auth.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  // Define la fecha para el calendario
  viewDate: Date = new Date(); // Fecha actual
  ngOnInit() {}

  // Método para navegar a la página del formulario
  goToForm() {
    this.router.navigate(['/form']); // Asegúrate de que esta ruta coincide con la configurada en `form-routing.module.ts`
  }
  onDayClicked(event: any) {
    console.log('Día seleccionado:', event.date);
  }

  async logout() {
    try {
      await this.authService.logout();
      console.log('Sesión cerrada correctamente');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
