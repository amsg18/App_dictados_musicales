import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorreccionPageRoutingModule } from './correccion-routing.module';

import { CorreccionPage } from './correccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorreccionPageRoutingModule
  ],
  declarations: [CorreccionPage]
})
export class CorreccionPageModule {}
