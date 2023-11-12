import { ControlType } from "../enums/control-type";
import { FormField } from "./form-field";
import { Qualification } from "./qualification";

export interface Mentee {
  fields: FormField[];
  qualifications: Qualification[];
}

export const Mentee: Mentee = {
  fields: [
    { key: 'id', value: 'uuid', controlType: ControlType.Input },
    { key: 'name', value: '', controlType: ControlType.Input },
    // ... other fields
  ],
  qualifications: [
    // Example qualification
    {
      fields: [
        { key: 'qualificationName', value: 'TypeScript', controlType: ControlType.Input },
        { key: 'qualificationRating', value: 1, controlType: ControlType.Slider, options: { min: 1, max: 5, step: 1 }}
      ]
    }
    // ... other qualifications
  ]
};
