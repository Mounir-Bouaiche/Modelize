import {Component, Input, OnInit} from '@angular/core';
import {TableComponent} from '../table/table.component';
import {of} from 'rxjs';

@Component({
  selector: '[relationship]',
  template: ''
})
export class RelationshipComponent implements OnInit {
  @Input() source: TableComponent;
  @Input() target: TableComponent;

  src: TableComponent;
  trg: TableComponent;
  ngOnInit(): void {
    of(this.source).subscribe(value => {
      if (value) this.src = value;
    });
    of (this.trg).subscribe(value => {
      if (value) this.trg = value;
    });
  }
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
