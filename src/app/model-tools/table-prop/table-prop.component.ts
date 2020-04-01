import {Component, Input, OnInit} from '@angular/core';
import {MySQLType, TableModel} from '../../services/model.service';

@Component({
  selector: 'table-prop',
  templateUrl: './table-prop.component.html'
})
export class TablePropComponent implements OnInit {
  @Input() table: TableModel;
  mySQL: MySQLType[];

  constructor() {
  }

  ngOnInit(): void {
    this.mySQL = [
      MySQLType.INTEGER,
      MySQLType.VARCHAR,
      MySQLType.CHAR,
      MySQLType.DECIMAL,
      MySQLType.DATE,
      MySQLType.TIME,
      MySQLType.DATE_TIME,
      MySQLType.TIMESTAMP,
      MySQLType.BLOB
    ];
  }

  getType(type: MySQLType): string {
    return MySQLType[type];
  }

  addField() {
    this.table.fields.push({
      name: '',
      type: MySQLType.INTEGER
    });
  }

  noError($e: KeyboardEvent) {
    if ($e.key.search(/Backspace|[0-9]/i) === -1) {
      $e.preventDefault();
    }
  }
}
