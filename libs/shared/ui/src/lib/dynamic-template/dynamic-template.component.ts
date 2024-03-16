import { Component } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DataItem { key: string; value: any; }

@Component({
  selector: 'ecoaching-on-pi-dynamic-template',
  templateUrl: './dynamic-template.component.html',
  styleUrls: ['./dynamic-template.component.scss']
})
export class DynamicTemplateComponent {

  dataList: DataItem[][] = [ [ { key: 'title', value: 'Item 1' }, { key: 'description', value: 'Description 1' }, { key: 'extra', value: 'Extra info' } ],
[ { key: 'name', value: 'Item 2' }, { key: 'details', value: 'Details 2' }]]

}

