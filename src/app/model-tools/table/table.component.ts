import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MySQLType, TableModel} from '../../services/model.service';

@Component({
  selector: 'sql-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewChecked {
  @Input() table: TableModel;
  @Output() clicked = new EventEmitter<MouseEvent>();
  el: HTMLDivElement;
  sourceP: { x: number, y: number };
  @ViewChild('element') private element;

  ngOnInit(): void {
    if (!this.table.pos) {
      this.table.pos = {x: 0, y: 0};
    }
    this.sourceP = this.table.pos;
  }

  getType(type: MySQLType) {
    return MySQLType[type];
  }

  ngAfterViewChecked(): void {
    this.el = this.element.nativeElement;
  }
}
