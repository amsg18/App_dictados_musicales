import {IOMR} from "../iomr";
import {INota, IPentagrama} from "../inota";

/**
 * Implementación de prueba
 */
export class OMRMockImpl implements IOMR {
  end2endStaffLevel(image: HTMLImageElement): IPentagrama {
    return {
      compases: [
        {notas: [{pitch: 'C/4', duration: 'h'},  {pitch: 'G/4', duration: 'q'}, {pitch: 'F/4', duration: 'q'}]},
        {notas: [{pitch: 'E/4', duration: 'q'},  {pitch: 'D/4', duration: 'q'}, {pitch: 'C/4', duration: 'h'}]},
        {notas: [{pitch: 'F/4', duration: 'h'},  {pitch: 'E/4', duration: 'h'}]},
        {notas: [{pitch: 'G/4', duration: 'q'},  {pitch: 'E/4', duration: 'q'}, {pitch: 'C/4', duration: 'h'}]}
      ]
    };
  }
}
