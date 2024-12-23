import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FormPageRoutingModule } from './form-routing.module';
import { FormPage } from './form.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FormPageRoutingModule],

  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Esto permite usar elementos personalizados
})
export class FormPageModule {}
