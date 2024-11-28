import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntryService } from 'src/app/firebase/entry.service';
import { Entry } from 'src/app/models/entry.model';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  entry: Entry = {
    id_entry: '', // Firebase generará un ID automáticamente
    id_usuario: '123456', // Asigna dinámicamente el ID del usuario autenticado si es necesario
    date: new Date(),
    mood: '',
    horas_dormidas: 0,
    nivel_focus: 0,
    nivel_ansiedad: 0,
    hidratacion: 0,
    ejercicio: false,
    crisis_panico: false,
    med_tomada: false,
  };

  constructor(
    private entryService: EntryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['date']) {
        this.entry.date = new Date(params['date']);
      }
    });
  }

  // Método para guardar la entrada
  submitEntry() {
    this.entryService
      .addEntry(this.entry)
      .then(() => {
        console.log('Entrada registrada exitosamente');
        this.router.navigate(['/visualizar']); // Changed from '/tracker' to '/visualizar'
      })
      .catch((error) => {
        console.error('Error al registrar la entrada:', error);
      });
  }
}
