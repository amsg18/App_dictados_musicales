import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MockPageRoutingModule } from './mock-routing.module';

import { MockPage } from './mock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MockPageRoutingModule
  ],
  declarations: [MockPage]
})
export class MockPageModule {}
