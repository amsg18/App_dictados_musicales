import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Factory, Formatter, Stave, StaveNote, Vex, Voice} from "vexflow";
import {ICompas, INota, IPentagrama} from "../../model/inota";

@Component({
  selector: 'app-partitura',
  standalone: true,
  imports: [],
  templateUrl: './partitura.component.html',
  styleUrl: './partitura.component.scss'
})
export class PartituraComponent implements OnChanges {
  @Input() pentagrama: IPentagrama | undefined;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pentagrama']) {
      this.render();
    }
  }

  private render() {
      if (this.pentagrama) {
        const VF = new Factory({
          renderer: { elementId: 'output', width: 800, height: 200 },
        });
        const context = VF.getContext();

        let x = 10;
        let firstMeasure = true;

        this.pentagrama.compases.forEach(compas => {
          const stave = new Stave(x, 0, 200);
          x+=stave.getWidth();

          // Add a clef and time signature.
          if (firstMeasure) {
            stave.addClef("treble").addTimeSignature("4/4");
            firstMeasure = false;
          }
          // Connect it to the rendering context and draw!
          stave.setContext(VF.getContext()).draw();

          // Create the notes
          // En Vexflow cada stave es un compás
          const notes: StaveNote[] = [];
          for (let i=0; i<compas.notas.length; i++) {
            const nota = compas.notas[i];
            const staveNote = new StaveNote({keys: [nota.pitch], duration: nota.duration});
            if (nota.resaltar) {
              staveNote.setStyle({ fillStyle: "red", strokeStyle: "red" });
            }
            notes.push(staveNote);
          }

          Formatter.FormatAndDraw(context, stave, notes);
        });
      }
  }
}
