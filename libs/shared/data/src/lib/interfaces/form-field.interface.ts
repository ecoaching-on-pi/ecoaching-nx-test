import { ControlType } from "../enums/control-type.enum";

export interface FormField {
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  controlType: ControlType;
  options?: {
    min?: number;
    max?: number;
    step?: number;
    // Other options as needed
  };
}
