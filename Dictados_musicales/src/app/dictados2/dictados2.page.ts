import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dictados2',
  templateUrl: './dictados2.page.html',
  styleUrls: ['./dictados2.page.scss'],
})
export class Dictados2Page implements OnInit {

  constructor(private router:Router) { 
   
  }
  ngOnInit() {
  }
  goHome(){
    this.router.navigate(['/home'])
  }
  goMenu(){
    this.router.navigate(['/seleccion'])
  }
}
