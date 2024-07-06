import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-dictado',
  templateUrl: './dictado.page.html',
  styleUrls: ['./dictado.page.scss'],
})
export class DictadoPage implements OnInit {

  @ViewChild('drawingCanvas') canvas: any;
  @ViewChild('pentagramCanvas') pentagramCanvas: any;
  @ViewChild('audioElement') audioElemntRef!: ElementRef;
  @ViewChild('audioButton') audioButtonRef!: ElementRef;

  audio!: HTMLAudioElement;
  audio_button!: HTMLAudioElement;
  canvasElement!: HTMLCanvasElement; //Le aseguramos que va a ser de tipo HTMLCanvasElement
  pentagramCanvasElement!: HTMLCanvasElement;

  articleID!: number;
  dictadosId!: number;

  combinedImageUrl: string = '';
  lastX: number = -1;
  lastY: number = -1;
  currentColour: string ='black'; //no se utiliza de momento
  sizeBrush:number = 2;           // no se utiliza de momento
  borrador:boolean = false;
  currentTool = 'brush';

  constructor(private router:Router, private route:ActivatedRoute) { 

  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.articleID = +params['id']; // + es para convertir en número
      this.dictadosId = +params['dictadosId'];
    })
   }
  ngAfterViewInit(){
    this.canvasElement = this.canvas.nativeElement;

    this.pentagramCanvasElement = this.pentagramCanvas.nativeElement;
    this.setupCanvas();




    this.audio = this.audioElemntRef.nativeElement;
    this.audio_button = this.audioButtonRef.nativeElement;
    this.audio_button.src='./assets/audios/beep.wav';
    
    switch (this.articleID) {
      case 1:
        this.audio.src = './assets/audios/Dictado1.wav'; 
        break;
      case 2:
        this.audio.src = './assets/audios/Dictado2.wav';
        break;
      case 3:
        this.audio.src = './assets/audios/Dictado3.wav';
        break;
      case 4:
        this.audio.src = './assets/audios/Dictado4.wav';
      break;
      case 5:
        this.audio.src = './assets/audios/Dictado5.wav';
      break;
      case 6:
        this.audio.src = './assets/audios/Dictado6.wav';
      break;
      default:
        this.audio.src = './assets/audios/Dictado1.wav'; // Audio por defecto
        break;
    }
    this.audio.load();


  }


  setupCanvas() {
    const canvas = document.getElementById('pentagramCanvas') as HTMLCanvasElement;

    if(canvas){
      
      const style = window.getComputedStyle(canvas);
      const visualWidth = parseFloat(style.width);
      const visualHeight = parseFloat(style.height);
      this.canvasElement.width = visualWidth;
      this.canvasElement.height = visualHeight;
  
    }else{
      this.canvasElement.width = 600;
      this.canvasElement.height = 400;
    }
  

    this.pentagramCanvasElement.width = window.innerWidth;
    this.pentagramCanvasElement.height = window.innerHeight;

    // Dibujar el pentagrama como fondo en el canvas de pentagrama
    this.drawBackground();
 
  }

  drawBackground(){
   // let ctx = this.pentagramCanvasElement.getContext('2d');
   // if (ctx) {
   //   let pentagram = new Image();
   //   pentagram.src = "./assets/pentagrama_recortado.png";
//
   //   pentagram.onload = () => {
   //     if (ctx)
   //       ctx.drawImage(pentagram, 0, 0);
   //   }
   // 
   //   ctx.fillRect(0, 0, this.pentagramCanvasElement.width, this.pentagramCanvasElement.height);
   // } else {
   //   console.error('Contexto del canvas de fondo no disponible');
   // }
   const ctx = this.pentagramCanvasElement.getContext('2d');
   if (!ctx) {
       console.error('No se pudo obtener el contexto 2D del canvas de pentagrama');
       return;
   }

   // Limpiar el canvas antes de dibujar
   ctx.clearRect(0, 0, this.pentagramCanvasElement.width, this.pentagramCanvasElement.height);

   // Crear una nueva imagen
   const pentagram = new Image();
   if(this.articleID == 3 || this.articleID == 5 || this.articleID == 6 ){
      pentagram.src = "./assets/images/pentagrama_recortado2.png"; 
   }else  pentagram.src = "./assets/images/pentagrama_recortado.png";
   
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

  handleStart(ev:Event){
  
    //Se obtiene la posición en x e y de donde se ha pulsado para dibujar
    let rect = this.canvasElement.getBoundingClientRect();
  // let offsetX = rect.left + window.scrollX - document.documentElement.clientLeft;
  // let offsetY = rect.top + window.scrollY - document.documentElement.clientTop;
  // this.lastX = ev.touches[0].pageX - offsetX;
  // this.lastY = ev.touches[0].pageY - offsetY;
  if(ev instanceof TouchEvent){
    this.lastX = ev.touches[0]. clientX - rect.left;
    this.lastY = ev.touches[0]. clientY - rect.top;
  } else if (ev instanceof MouseEvent) {
    this.lastX = ev.clientX - rect.left;
    this.lastY = ev.clientY - rect.top;
  }
    


//  if (this.lastX < 92 || this.lastX > 720 ||
//    this.lastY < 100 || this.lastY > 500) {
//  this.lastX = -1;
//  this.lastY = -1; // Esto indica que el punto inicial está fuera de los límites
//}


  }


  handleMove(ev:Event){
    //console.log(ev);
    if (this.lastX === -1 || this.lastY === -1) {
      return; // Salir si lastX o lastY no están definidos
    }

    let ctx = this.canvasElement.getContext('2d');
    if(ctx){
      ctx.strokeStyle=this.currentColour;
      ctx.lineWidth=this.sizeBrush;
      ctx.lineJoin='round';
    }
    let rect = this.canvasElement.getBoundingClientRect();
    let offsetX = rect.left + window.scrollX - document.documentElement.clientLeft;
    let offsetY = rect.top + window.scrollY - document.documentElement.clientTop;
   
   let currentX:number = 0 , currentY: number = 0;
    if(ev instanceof TouchEvent){
      currentX = ev.touches[0].pageX - offsetX;
      currentY = ev.touches[0].pageY - offsetY;
    } else if(ev instanceof MouseEvent){
      currentX = ev.clientX - rect.left;
      currentY = ev.clientY - rect.top;
    }


    //console.log(currentX, currentY);
  // const currentX = ev.touches[0].clientX - rect.left;
   //const currentY = ev.touches[0].clientY - rect.top;

    if(ctx){
      if(this.borrador){
        ctx.clearRect(currentX - 10, currentY - 10, 20, 20); 
      }else{
        ctx.beginPath();
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(currentX,currentY);
        ctx.closePath();
      
        ctx.stroke();

        this.lastX = currentX;
        this.lastY = currentY;
      }
     

      

    }else console.log("Ctx is null");
  }

  handleEnd(ev:Event){
    //console.log(ev);
    if(ev instanceof MouseEvent){
      this.lastX =  -1 ;
      this.lastY =  -1 ;  
    
    }
  }

  changeToEraser(){
    this.borrador=true;
    this.audio_button.play();
  }
  changeToBrush(){
    this.borrador = false;
    this.audio_button.play();
  }
  changeColour(colour:string){
    this.currentColour = colour;

  }
  changeSize(num:number){
    this.sizeBrush = num;
  }

  clearCanvas() {
    let ctx = this.canvasElement.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }
  }

  goHome(){
    this.pauseAudio();
    this.clearCanvas();
    this.closeModalHome();
    this.router.navigate(['/home'])

  }
  goDictados(){
    this.pauseAudio();
    this.clearCanvas();
    this.closeModalDictados();
    this.router.navigate(['/seleccion'])

  }

  goCorreccion(){
    this.pauseAudio();
    this.closeModalCorreccion();
    this.router.navigate(['/correccion'], {queryParams: {imageId: this.articleID}})
  }


  combineCanvases() {
    // Crear un canvas nuevo en memoria para combinar la imagen de los dos canvas
    let combinedCanvas = document.createElement('canvas');
    combinedCanvas.width = this.canvasElement.width;
    combinedCanvas.height = this.canvasElement.height;
    let combinedCtx = combinedCanvas.getContext('2d');

    // Dibujar el canvas del pentagrama
    if (combinedCtx) {
      combinedCtx.drawImage(this.pentagramCanvasElement, 0, 0);

      // Dibujar el canvas del dictado
      combinedCtx.drawImage(this.canvasElement, 0, 0);
    }

    this.combinedImageUrl = combinedCanvas.toDataURL('image/png');
  }
 
  downloadImage(){
    this.combineCanvases();
    let link = document.createElement('a');
    link.href=this.combinedImageUrl;
    link.download = 'canvas-image.png';
    link.click();
  }

 // playAudio(){
 //   let audio = new Audio('./assets/audios/wheel.wav');
 //   audio.oncanplaythrough = () => {
 //     audio.play();
 //   };
 //   audio.onerror = (err) => {
 //     console.error('Error al cargar/reproducir el audio:', err);
 //   };
 //   audio.load();
 // }
  
playAudio(){
  if(this.audio){
    this.audio.play();
  }
}

 restartAudio() {
   if (this.audio) {
     this.audio.currentTime = 0;
   }
 }
  
 pauseAudio() {
    if (this.audio) {
      this.audio.pause(); // Detener la reproducción
    }
  }

  openModalHome() {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'block';
    }
    this.audio_button.play();
  }

  // Método para cerrar el modal
  closeModalHome() {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'none';
    }
    this.audio_button.play();
  }

  openModalDictados() {
    const modal = document.getElementById('myModalDictados');
    if (modal) {
      modal.style.display = 'block';
    }
    this.audio_button.play();
  }

  // Método para cerrar el modal
  closeModalDictados() {
    const modal = document.getElementById('myModalDictados');
    if (modal) {
      modal.style.display = 'none';
    }
    this.audio_button.play();
  }
  openModalCorreccion() {
    const modal = document.getElementById('myModalCorreccion');
    if (modal) {
      modal.style.display = 'block';
    }
    this.audio_button.play();
  }

  // Método para cerrar el modal
  closeModalCorreccion() {
    const modal = document.getElementById('myModalCorreccion');
    if (modal) {
      modal.style.display = 'none';
    }
    this.audio_button.play();
  }
}
