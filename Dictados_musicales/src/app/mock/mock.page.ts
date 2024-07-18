import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {OMR} from "../../model/iomr";
import {Levenhstein} from "../../model/levenhstein";
import {NgIf} from "@angular/common";
import {PartituraComponent} from "../partitura/partitura.component";
import {INota, IPentagrama} from "../../model/inota";

@Component({
  selector: 'app-mock',
  templateUrl: './mock.page.html',
  standalone: true,
  imports: [RouterOutlet, NgIf, PartituraComponent],
  styleUrls: ['./mock.page.scss'],
})
export class MockPage implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('audioButton') audioButtonRef!: ElementRef;

  public pentagrama: IPentagrama |undefined;
  porcentaje: number |undefined;
  tipo_ejercicio!:number;
  imageId!: number;
  audio_button!: HTMLAudioElement;

  constructor(private router:Router, private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.imageId = +params['imageId'];        //Segun el ejercicio seleccionado se carga la solucion correspondiente
      this.tipo_ejercicio = +params['tipo_ejercicio'];  //el tipo de ejercicios seleccionado para cuando se quiera ver mas ejercicios
      //this.drawBackground();
    })
    this.cargaImagenEnCanvas();
    this.corrige();
  }
  ngAfterViewInit(){
    this.audio_button = this.audioButtonRef.nativeElement;
    this.audio_button.src='./assets/audios/beep.wav';
  }
  cargaImagenEnCanvas(): void {
    const img = new Image();
    img.src = '../../assets/ejemplos/ejemplo.jpg'; // esta imagen es la que se obtendría dibujando sobre el canvas

    img.onload = () => {
      const ctx = this.canvas.nativeElement.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        ctx.drawImage(img, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      }
    };
  }

  findDictado(): IPentagrama {
    return {
      compases: [
        {notas: [{pitch: 'C/4', duration: 'h'},  {pitch: 'E/4', duration: 'q'}, {pitch: 'C/4', duration: 'q'}]},
        {notas: [{pitch: 'C/4', duration: 'q'},  {pitch: 'C/4', duration: 'q'}, {pitch: 'C/4', duration: 'h'}]},
        {notas: [{pitch: 'G/4', duration: 'h'},  {pitch: 'E/4', duration: 'h'}]},
        {notas: [{pitch: 'G/4', duration: 'q'},  {pitch: 'E/4', duration: 'q'}, {pitch: 'C/4', duration: 'h'}]}
      ]
    };
  }

  corrige() {
    // obtiene los datos del canvas
    const imageData = this.canvas.nativeElement.toDataURL('image/jpg');
    const img = new Image();
    img.src = imageData;

    // primero reconoce la partitura a partir de la imagen
    const omr = new OMR();
    const omrOutput = omr.end2endStaffLevel(img);

    // obtenemos la partitura esperada
    const dictado = this.findDictado();

    // después comparamos con la partitura que debería haber salido
    const levenhstein = new Levenhstein();
    const dictadoAsStringArray = this.partituraASecuenciaDeCadenas(dictado);
    const omrOutputAsStringArray = this.partituraASecuenciaDeCadenas(omrOutput);

    const distancia = levenhstein.distance(dictadoAsStringArray, omrOutputAsStringArray);

    const porcentajeRaw = 100.0 * distancia.distance / Math.max(dictadoAsStringArray.length, omrOutputAsStringArray.length);
    this.porcentaje = parseFloat(porcentajeRaw.toFixed(2));

    this.pentagrama = dictado; // TODO habría que clonarlo
    let i= 0; //TODO Habría que revisar las inserciones y borrados mejor
    this.pentagrama.compases.forEach(compas => {
      compas.notas.forEach(nota => {
        if (distancia.backtrace[i].operation != "MATCH") {
          nota.resaltar = true;
        }
        i++;
      });
    });

  }

  partituraASecuenciaDeCadenas(p: IPentagrama): string[] {
    const result: string[] = [];
    p.compases.forEach(compas => {
      result.push(...compas.notas.map(nota => nota.pitch + '/' + nota.duration));
    })
    return result;
  }

  goHome(){
    //this.audio_button.play();
    this.router.navigate(['/home']);
  }

  goDictados(){
    //this.audio_button.play();
    this.router.navigate(['/seleccion' ], {queryParams: {id: this.tipo_ejercicio}});
  }
}

