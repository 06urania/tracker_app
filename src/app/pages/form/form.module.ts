import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FormPageRoutingModule } from './form-routing.module';
import { FormPage } from './form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // Importa este módulo para que funcionen los componentes de Ionic
    FormPageRoutingModule,
  ],
  declarations: [FormPage],
})
export class FormPageModule {}
