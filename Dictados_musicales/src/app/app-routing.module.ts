import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'seleccion',
    loadChildren: () => import('./seleccion/seleccion.module').then( m => m.SeleccionPageModule)
  },
  {
    path: 'dictado',
    loadChildren: () => import('./dictado/dictado.module').then( m => m.DictadoPageModule)
  },
  {
    path: 'dictados2',
    loadChildren: () => import('./dictados2/dictados2.module').then( m => m.Dictados2PageModule)
  },
  {
    path: 'ejercicios',
    loadChildren: () => import('./ejercicios/ejercicios.module').then( m => m.EjerciciosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
