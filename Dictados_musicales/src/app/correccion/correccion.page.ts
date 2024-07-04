import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-correccion',
  templateUrl: './correccion.page.html',
  styleUrls: ['./correccion.page.scss'],
})
export class CorreccionPage implements OnInit {

  @ViewChild('pentagramCanvas') pentagramCanvas: any;

  constructor(private router:Router) { }

  pentagramCanvasElement!: HTMLCanvasElement;


  ngOnInit() {
  }

  ngAfterViewInit(){
    this.pentagramCanvasElement = this.pentagramCanvas.nativeElement;
    this.setupCanvas();

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
   pentagram.src = "./assets/pentagrama_recortado.png";
   
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


  downloadCorreccion(){
    const canvas = this.pentagramCanvasElement;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'pentagram.png';
    link.click();
  }
  goHome(){
    this.router.navigate(['/home']);
  }

  goDictados(){
    this.router.navigate(['/seleccion']);
  }
}
