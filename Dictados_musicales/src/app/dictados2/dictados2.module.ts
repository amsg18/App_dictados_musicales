import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Dictados2PageRoutingModule } from './dictados2-routing.module';

import { Dictados2Page } from './dictados2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Dictados2PageRoutingModule
  ],
  declarations: [Dictados2Page]
})
export class Dictados2PageModule {}
