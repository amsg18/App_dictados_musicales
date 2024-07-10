import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-correccion',
  templateUrl: './correccion.page.html',
  styleUrls: ['./correccion.page.scss'],
})
export class CorreccionPage implements OnInit {

  @ViewChild('pentagramCanvas') pentagramCanvas: any;
  @ViewChild('audioButton') audioButtonRef!: ElementRef;

  constructor(private router:Router, private route:ActivatedRoute) { }

  pentagramCanvasElement!: HTMLCanvasElement;
  imageId!: number;
  tipo_ejercicio!:number;
  audio_button!: HTMLAudioElement;


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.imageId = +params['imageId'];        //Segun el ejercicio seleccionado se carga la solucion correspondiente
      this.tipo_ejercicio = +params['tipo_ejercicio'];  //el tipo de ejercicios seleccionado para cuando se quiera ver mas ejercicios
      this.drawBackground();
    })


  }

  ngAfterViewInit(){
    this.pentagramCanvasElement = this.pentagramCanvas.nativeElement;
    this.setupCanvas();
    this.audio_button = this.audioButtonRef.nativeElement;
    this.audio_button.src='./assets/audios/beep.wav';

  }


  setupCanvas(){
    this.pentagramCanvasElement.width = window.innerWidth;
    this.pentagramCanvasElement.height = window.innerHeight;
    this.drawBackground();

  }

  drawBackground(){
    const ctx = this.pentagramCanvasElement.getContext('2d');
   if (!ctx) {
       console.error('No se pudo obtener el contexto 2D del canvas de pentagrama');
       return;
   }

   // Limpiar el canvas antes de dibujar
   ctx.clearRect(0, 0, this.pentagramCanvasElement.width, this.pentagramCanvasElement.height);

   // Crear una nueva imagen
   const pentagram = new Image();
   switch (this.imageId){
    case 1:
      pentagram.src = "./assets/images/dictado1.png";
      break;
    case 2:
      pentagram.src = "./assets/images/dictado2.png";
      break;
    case 3:
      pentagram.src = "./assets/images/dictado3.png";
      break;
    case 4:
      pentagram.src = "./assets/images/dictado4.png";
      break;
    case 5:
      pentagram.src = "./assets/images/dictado5.png";
      break;
    case 6:
      pentagram.src = "./assets/images/dictado6.png";
      break;
    default:
        pentagram.src = "./assets/images/dictado1.png";
      break
   }

   
   // Asegurarnos de que la imagen se ha cargado antes de dibujarla
   pentagram.onload = () => {
       ctx.drawImage(
           pentagram,
           0, 0,
           pentagram.width, pentagram.height, // Tamaño original de la imagen
           0, 0,
           this.pentagramCanvasElement.width, this.pentagramCanvasElement.height // Tamaño al que se ajustará la imagen
       );
   };

  }

//Opcion para descargar la imagen en caso de quererla
  downloadCorreccion(){
    this.audio_button.play();
    const canvas = this.pentagramCanvasElement;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'pentagram.png';
    link.click();
  }
  goHome(){
    this.audio_button.play();
    this.router.navigate(['/home']);
  }

  goDictados(){
    this.audio_button.play();
    this.router.navigate(['/seleccion' ], {queryParams: {id: this.tipo_ejercicio}});
  }
}
