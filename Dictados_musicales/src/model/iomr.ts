import {OMRMockImpl} from "./impl/omr_mock_impl";
import {INota, IPentagrama} from "./inota";

export interface IOMR {
  /**
   * A partir de una imagen devuelve la secuencia musical reconocida
   * @param image
   */
  end2endStaffLevel(image: HTMLImageElement): IPentagrama;
}

export const OMR = OMRMockImpl;
