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
  goSelecDictado(){
    this.router.navigate(['/seleccion'])
  }
  goDictados2(){
    this.router.navigate(['/dictados2'])
  }
  


}