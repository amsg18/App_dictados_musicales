import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
})
export class EjerciciosPage implements OnInit {
  @ViewChild('audioButton') audioButtonRef!: ElementRef;
  audio_button!: HTMLAudioElement;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.audio_button = this.audioButtonRef.nativeElement;
    this.audio_button.src='./assets/audios/beep.wav';
  }

  //DIRECCIONES A OTRAS PANTALLAS
  goHome(){
    this.audio_button.play();
    this.router.navigate(['/home'])
  }
  goSelecDictado(dictadosId: number){
    this.audio_button.play();
    this.router.navigate(['/seleccion'], { queryParams: {id: dictadosId}}); //pasamos el tipo de ejercicio seleccionado
  }
  goDictados2(){
    this.audio_button.play();
    this.router.navigate(['/dictados2']);
  }
  


}
