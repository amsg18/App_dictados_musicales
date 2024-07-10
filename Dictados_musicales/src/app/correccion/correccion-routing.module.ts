import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorreccionPage } from './correccion.page';

const routes: Routes = [
  {
    path: '',
    component: CorreccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorreccionPageRoutingModule {}
