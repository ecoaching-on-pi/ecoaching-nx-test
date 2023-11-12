import { ControlType } from "../enums/control-type";
import { FormField } from "./form-field";
import {Qualification} from "./qualification"

export interface Mentor {
  fields: FormField[];
  qualifications: Qualification[];
}

export const mentor: Mentor = {
  fields: [
    { key: 'id', value: 'uuid', controlType: ControlType.Input },
    { key: 'name', value: '', controlType: ControlType.Input }
  ],
    qualifications: [
      // Example qualification
      {
        fields: [
          { key: 'qualificationName', value: 'TypeScript', controlType: ControlType.Input },
          { key: 'qualificationRating', value: 5, controlType: ControlType.Slider, options: { min: 1, max: 5, step: 1 }}
        ]
      }
      // ... other qualifications
    ]

};
