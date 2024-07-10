import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('audioButton') audioButtonRef!: ElementRef;
  audio_button!: HTMLAudioElement; //audio para botones

  constructor(private router:Router) { } //Se utiliza para dirigir a otras pantallas

  ngOnInit(){

  }
 
ngAfterViewInit(){
  this.audio_button = this.audioButtonRef.nativeElement; 
  this.audio_button.src='./assets/audios/beep.wav'; 
}

  goEjercicios(){
    this.audio_button.play();
    this.router.navigate(['/ejercicios'])
  }
  

}
