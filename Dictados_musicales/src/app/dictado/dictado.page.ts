import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dictado',
  templateUrl: './dictado.page.html',
  styleUrls: ['./dictado.page.scss'],
})
export class DictadoPage implements OnInit {

 
  constructor(private router:Router) { }

  ngOnInit() {
  }

  goHome(){
    this.router.navigate(['/home'])
  }
  goMenu(){
    this.router.navigate(['/seleccion'])
  }

}
