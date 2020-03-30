import {Component, Input} from '@angular/core';
import {TableComponent} from '../table/table.component';

@Component({
  selector: '[relationship]',
  template: ''
})
export class RelationshipComponent {
  @Input() source: TableComponent;
  @Input() target: TableComponent;
}

export enum RelationshipCardinality {
  ONE_TO_ONE = '1:1',
  ONE_TO_MANY = '1:n',
  MANY_TO_ONE = 'n:1',
  MANY_TO_MANY = 'n:n'
}

export interface Relationship {
  name: string;
  source: string;
  target: string;
  type: RelationshipCardinality;
}
