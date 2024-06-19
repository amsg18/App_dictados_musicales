import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dictado',
  templateUrl: './dictado.page.html',
  styleUrls: ['./dictado.page.scss'],
})
export class DictadoPage implements OnInit {

  @ViewChild('drawingCanvas') canvas: any;
  canvasElement!: HTMLCanvasElement; //Le aseguramos que va a ser de tipo HTMLCanvasElement
  lastX: number = 0;
  lastY: number = 0;
  currentColour: string ='black';
  sizeBrush:number = 1;
  borrador:boolean = false;
  constructor(private router:Router) { 
   
  }


  ngOnInit() {
  }
  ngAfterViewInit(){
    console.log(this.canvas);
    this.canvasElement = this.canvas.nativeElement;
  }

  handleStart(ev:TouchEvent){
    console.log(ev);
    //Se obtiene la posición en x e y de donde se ha pulsado para dibujar
    let rect = this.canvasElement.getBoundingClientRect();
    let offsetX = rect.left + window.scrollX - document.documentElement.clientLeft;
    let offsetY = rect.top + window.scrollY - document.documentElement.clientTop;
    this.lastX = ev.touches[0].pageX - offsetX;
    this.lastY = ev.touches[0].pageY - offsetY;


  }


  handleMove(ev:TouchEvent){
    //console.log(ev);
    let ctx = this.canvasElement.getContext('2d');
    if(ctx){
      ctx.strokeStyle=this.currentColour;
      ctx.lineWidth=this.sizeBrush;
      ctx.lineJoin='round';
    }
    let rect = this.canvasElement.getBoundingClientRect();
    let offsetX = rect.left + window.scrollX - document.documentElement.clientLeft;
    let offsetY = rect.top + window.scrollY - document.documentElement.clientTop;
    let currentX = ev.touches[0].pageX - offsetX;
    let currentY = ev.touches[0].pageY - offsetY;

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

  handleEnd(ev:TouchEvent){
    //console.log(ev);
  }

  changeToEraser(){
    this.borrador=true;
  }
  changeToBrush(){
    this.borrador = false;
  }
  changeColour(colour:string){
    this.currentColour = colour;

  }
  changeSize(num:number){
    this.sizeBrush = num;
  }
  goHome(){
    this.router.navigate(['/home'])
  }
  goMenu(){
    this.router.navigate(['/seleccion'])
  }

}
