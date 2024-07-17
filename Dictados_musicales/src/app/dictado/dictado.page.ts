import { Component, OnInit, ViewChild, ElementRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-dictado',
  templateUrl: './dictado.page.html',
  styleUrls: ['./dictado.page.scss'],
})
export class DictadoPage implements OnInit {

  @ViewChild('drawingCanvas') canvas: any;                  //canvas en el que se dibuja
  @ViewChild('pentagramCanvas') pentagramCanvas: any;       //canvas con la imagen
  @ViewChild('audioElement') audioElemntRef!: ElementRef;   //audio del dictado
  @ViewChild('audioButton') audioButtonRef!: ElementRef;    //audio de pulsar boton

  audio!: HTMLAudioElement;
  audio_button!: HTMLAudioElement;
  canvasElement!: HTMLCanvasElement; //Le aseguramos que va a ser de tipo HTMLCanvasElement
  pentagramCanvasElement!: HTMLCanvasElement;

  articleID!: number;
  dictadosId!: number;
  numeroId!: number;

  combinedImageUrl: string = '';
  lastX: number = -1; //ultima posicion X, se inicializa con -1 porque no se comienza a dibujar
  lastY: number = -1;//ultima posicion Y, se inicializa con -1 porque no se comienza a dibujar
  currentColour: string ='black'; //para cambiar el color del pincel
  sizeBrush:number = 2;           // para cambiar el tamaño del pincel
  borrador:boolean = false;       //se distingue entre borrador o pincel

  constructor(private router:Router, private route:ActivatedRoute, private http: HttpClient) { 

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

    this.audio = this.audioElemntRef.nativeElement;
    this.audio_button = this.audioButtonRef.nativeElement;
    this.audio_button.src='./assets/audios/beep.wav';

    //SELECCION DEL DICTADO SEGUN EL TIPO DE EJERCICIO Y EL NUMERO ELEGIDO, solo se cuentan con 6 dictados diferentes para realizar las pruebas
    switch (this.dictadosId) {
      case 3 :
        this.audio.src = './assets/audios/dictados/Dictado1.wav'; 
        this.numeroId = 1;
        break;
      case 4 :
        if( this.articleID % 2 == 0 ){
          this.audio.src = './assets/audios/dictados/Dictado6.wav'
          this.numeroId = 6;
        } else {
          this.audio.src = './assets/audios/dictados/Dictado2.wav';
          this.numeroId = 2;
        }
        break;
      case 5 :
          if( this.articleID == 1 || this.articleID == 4 || this.articleID == 7){
            this.audio.src = './assets/audios/dictados/Dictado1.wav'; 
            this.numeroId = 1;
          }else if(this.articleID == 2 || this.articleID == 5 || this.articleID == 8){
            this.audio.src = './assets/audios/dictados/Dictado2.wav'; 
            this.numeroId = 2;
          }else{
            this.audio.src = './assets/audios/dictados/Dictado6.wav';
            this.numeroId = 6;
          }  
        break;
      case 6:
        if( this.articleID == 1 || this.articleID == 4 || this.articleID == 7){
          this.audio.src = './assets/audios/dictados/Dictado3.wav'; 
          this.numeroId = 3;
        }else if(this.articleID == 2 || this.articleID == 5 || this.articleID == 8){
          this.audio.src = './assets/audios/dictados/Dictado5.wav'; 
          this.numeroId = 5;
        }else{
          this.audio.src = './assets/audios/dictados/Dictado4.wav';
          this.numeroId = 4;
        } 
        break;
      case 7:
        switch (this.articleID) {
          case 1:
            this.audio.src = './assets/audios/dictados/Dictado1.wav'; 
            this.numeroId = 1;
            break;
          case 2:
            this.audio.src = './assets/audios/dictados/Dictado2.wav';
            this.numeroId = 2;
            break;
          case 3:
            this.audio.src = './assets/audios/dictados/Dictado3.wav';
            this.numeroId = 3;
            break;
          case 4:
            this.audio.src = './assets/audios/dictados/Dictado4.wav';
            this.numeroId = 4;
          break;
          case 5:
            this.audio.src = './assets/audios/dictados/Dictado5.wav';
            this.numeroId = 5;
          break;
          case 6:
            this.audio.src = './assets/audios/dictados/Dictado6.wav';
            this.numeroId = 6;
          break;
          default:
            this.audio.src = './assets/audios/dictados/Dictado1.wav'; // Audio por defecto
            this.numeroId = 1;
            break;
        }
        break;
    }

    this.audio.load();
    this.setupCanvas();
    this.openModalInicio();
  }

  ionViewDidEnter() {
   this.openModalInicio();
   this.setupCanvas();
  }
  setupCanvas() {
    const canvas = document.getElementById('pentagramCanvas') as HTMLCanvasElement;

    if(canvas){ 
      const style = window.getComputedStyle(canvas);
      const visualWidth = parseFloat(style.width);
      const visualHeight = parseFloat(style.height);
      this.canvasElement.width = visualWidth; //coge el ancho definido en el css
      this.canvasElement.height = visualHeight; //coge la altura definida en el css
  
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

   const ctx = this.pentagramCanvasElement.getContext('2d');
   if (!ctx) {
       console.error('No se pudo obtener el contexto 2D del canvas de pentagrama');
       return;
   }

   // Limpiar el canvas antes de dibujar
   ctx.clearRect(0, 0, this.pentagramCanvasElement.width, this.pentagramCanvasElement.height);

   // Crear una nueva imagen
   const pentagram = new Image();
   if(this.numeroId == 3 || this.numeroId == 5 || this.numeroId == 6 ){
      pentagram.src = "./assets/images/pentagrama_recortado2.png"; 
      
   }else  pentagram.src = "./assets/images/pentagrama_recortado1.png";
   
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

  handleStart(ev:Event){ //se recibe un Event para hacerlo adaptable a ordenadores y se distingue con el ev instance of
  
    //Se obtiene la posición en x e y de donde se ha pulsado para dibujar
    let rect = this.canvasElement.getBoundingClientRect();
  if(ev instanceof TouchEvent){
    this.lastX = ev.touches[0]. clientX - rect.left;
    this.lastY = ev.touches[0]. clientY - rect.top;
  } else if (ev instanceof MouseEvent) {
    this.lastX = ev.clientX - rect.left;
    this.lastY = ev.clientY - rect.top;
  }

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

    //calculo de la posicion donde se ha tocado del canvas
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

    if(ctx){
      if(this.borrador){
        ctx.clearRect(currentX - 10, currentY - 10, 20, 20); 
      }else{
        //traza el camino del dibujo
        ctx.beginPath();
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(currentX,currentY);
        ctx.closePath();
        //dibuja
        ctx.stroke();
        //guarda la ultima posicion
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

  //Cambiar de pantalla
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
    this.router.navigate(['/seleccion'], {queryParams : {id: this.dictadosId}});

  }

  goCorreccion(){
    this.pauseAudio();
    this.closeModalCorreccion();
    this.router.navigate(['/correccion'], {queryParams: {imageId: this.numeroId, tipo_ejercicio: this.dictadosId}})
  }


  //Combinar canvas para pasar al Api en el momento de su uso
  combineCanvases() {


  // Crear un canvas nuevo en memoria con el tamaño del canvasElement
  let combinedCanvas = document.createElement('canvas');
  combinedCanvas.width = this.canvasElement.width;
  combinedCanvas.height = this.canvasElement.height;
  let combinedCtx = combinedCanvas.getContext('2d');

  // Dibujar el canvas del pentagrama ajustando su tamaño para encajar en el canvas combinado
  if (combinedCtx) {
      // Asumimos que el ancho del pentagramCanvas ya está ajustado correctamente en la página
      const pentagramWidth = this.pentagramCanvasElement.width;
      const pentagramHeight = this.pentagramCanvasElement.height;

      combinedCtx.drawImage(
          this.pentagramCanvasElement,
          0, 0, pentagramWidth, pentagramHeight,
          0, 0, combinedCanvas.width, combinedCanvas.height
      );

      // Dibujar el canvas del dictado
      combinedCtx.drawImage(
          this.canvasElement,
          0, 0, this.canvasElement.width, this.canvasElement.height,
          0, 0, combinedCanvas.width, combinedCanvas.height
      );
  }

 
    this.combinedImageUrl = combinedCanvas.toDataURL('image/png');
  }

  //descargar la imagen que se combina para hacer pruebas
  downloadImage(){
    this.combineCanvases();
  
    // URL de la API
    const apiUrl = 'URL_DE_TU_API';

    // Cuerpo de la solicitud HTTP
    const body = { image: this.combinedImageUrl };

    // Realiza la petición POST usando HttpClient

  //METODO 1
  //  this.http.post(apiUrl, body)
  //    .pipe(
  //      catchError(error => {
  //        console.error('Error al enviar la imagen', error);
  //        throw error; // Propaga el error para manejarlo en algún otro lugar si es necesario
  //      })
  //    )
  //    .subscribe(response => {
  //      console.log('Imagen enviada a la petición', response);
  //      // Lógica adicional después de recibir la respuesta de la API
  //    });
  

  //METODO 2
   // const apiUrl = 'URL';
   // const headers = new HttpHeaders({
   //   'Content-Type': 'application/json'
   // });
   // const body = {
   //   image: this.combinedImageUrl
   // };
  
   // this.http.post(apiUrl, body, {headers}).subscribe(
   //   response => {
   //     console.log('Imagen enviada a la peticion', response);
   //   },
   //   error => {
   //     console.error('Error al enviar la imagen', error);
   //   }
   // )

   let link = document.createElement('a');
   link.href=this.combinedImageUrl;
   link.download = 'canvas-image.png';
   link.click();
  }

//Eventos de audio de dictado
playAudio(){
  if(this.audio){
    this.audio.play();
  }
}

//no se utiliza
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

  //Funciones para los modales
  closeModalInicio() {
    const modal = document.getElementById('myModalInicio');
    if (modal) {
      modal.style.display = 'none';
    }
    this.audio_button.play();
    this.playAudio();
  }
  openModalInicio() {
    const modal = document.getElementById('myModalInicio');
    if (modal) {
      modal.style.display = 'block';
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
