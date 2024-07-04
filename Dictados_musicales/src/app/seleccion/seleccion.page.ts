import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.page.html',
  styleUrls: ['./seleccion.page.scss'],
})
export class SeleccionPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goHome(){
    this.router.navigate(['/home'])
  }
  goDictado(){
    this.router.navigate(['/dictado'])
  }

  goEjercicios(){
    this.router.navigate(['/ejercicios'])
  }

}
