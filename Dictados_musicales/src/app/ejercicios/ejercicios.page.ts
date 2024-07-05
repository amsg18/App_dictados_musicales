import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
})
export class EjerciciosPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goHome(){
    this.router.navigate(['/home'])
  }
  goSelecDictado(dictadosId: number){
    this.router.navigate(['/seleccion'], { queryParams: {id: dictadosId}});
  }
  goDictados2(){
    this.router.navigate(['/dictados2']);
  }
  


}
