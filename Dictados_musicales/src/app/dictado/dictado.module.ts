import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DictadoPageRoutingModule } from './dictado-routing.module';

import { DictadoPage } from './dictado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DictadoPageRoutingModule
  ],
  declarations: [DictadoPage]
})
export class DictadoPageModule {}
