import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DictadoPage } from './dictado.page';

const routes: Routes = [
  {
    path: '',
    component: DictadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DictadoPageRoutingModule {}
