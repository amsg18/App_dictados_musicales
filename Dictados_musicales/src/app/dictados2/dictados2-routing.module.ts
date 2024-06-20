import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dictados2Page } from './dictados2.page';

const routes: Routes = [
  {
    path: '',
    component: Dictados2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Dictados2PageRoutingModule {}
