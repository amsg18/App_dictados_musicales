import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.page.html',
  styleUrls: ['./seleccion.page.scss'],
})
export class SeleccionPage implements OnInit {


  @ViewChild('mainTitle', { static: false }) mainTitle!: ElementRef;
  @ViewChild('subtitle', { static: false }) subtitle!: ElementRef;

  @ViewChild('audioButton') audioButtonRef!: ElementRef;
  audio_button!: HTMLAudioElement;

  dictadosId !: number;
  constructor(private router:Router, private route:ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.dictadosId = +params['id']; // + es para convertir en número, recogemos el id del tipo de ejercicios
      this.updateTitlesIfReady();
    })


  }

  ngAfterViewInit(){
    this.updateTitlesIfReady();
    this.audio_button = this.audioButtonRef.nativeElement;
    this.audio_button.src='./assets/audios/beep.wav';


  }
  updateTitlesIfReady() {
    // Chequea si las referencias y los params están listos
    if (this.mainTitle && this.subtitle && this.dictadosId !== undefined) {
      this.changeTitle();
      this.cdr.detectChanges(); // Forzar detección de cambios
    }
  }

  changeTitle(){
    //Cambiara el titulo segun el tipo de ejercicio que se haya elegido
    switch (this.dictadosId) {
      case 3:
        this.mainTitle.nativeElement.textContent = '3 Notas';
        this.subtitle.nativeElement.textContent = 'Do mi sol';
        break;
      case 4: 
        this.mainTitle.nativeElement.textContent = '4 Notas';
        this.subtitle.nativeElement.textContent = 'Do mi sol la';
        break;
      case 5:
        this.mainTitle.nativeElement.textContent = '5 Notas';
        this.subtitle.nativeElement.textContent = 'Do re mi sol la';
        break;
      case 6:
        this.mainTitle.nativeElement.textContent = '6 Notas';
        this.subtitle.nativeElement.textContent = 'Do re mi fa sol la';
      break;
      case 7:
        this.mainTitle.nativeElement.textContent = '7 Notas';
        this.subtitle.nativeElement.textContent = 'Do re mi fa sol la si';
      break;
      default:
        this.mainTitle.nativeElement.textContent = '3 Notas';
        this.subtitle.nativeElement.textContent = 'Do mi sol';
        break;
    }
  }

 //DIRECCIONES A OTRAS PANTALLAS
  goHome(){
    this.audio_button.play();
    this.router.navigate(['/home']);
  }
  goDictado(articleId : number){
    this.audio_button.play();
    this.router.navigate(['/dictado'], { queryParams: {id: articleId, dictadosId: this.dictadosId}});
  }

  goEjercicios(){
    this.audio_button.play();
    this.router.navigate(['/ejercicios']);
  }

}
