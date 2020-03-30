import {Component, Input, OnInit} from '@angular/core';
import {Model, MySQLType, TableModel} from '../../services/model.service';
import {camel_case} from '../result.component';
import {RelationshipCardinality} from '../../model-tools/relationship/relationship.component';

@Component({
  selector: 'sql',
  templateUrl: './sql.component.html',
  styleUrls: ['./sql.component.scss']
})
export class SqlComponent implements OnInit {
  @Input() model: Model;

  ngOnInit(): void {
  }

  err(rel, msg): string {
    return `/*\nCouldn't convert RelationShip ${rel.name}:\n${msg}\n*/`;
  }

  get code(): string {
    const code: string[] = [];
    this.model.tables.forEach(tab => code.push(this.createTable(tab)));
    this.model.relationships.forEach(rel => {
      let tab1 = this.model.tables.find(t => t.name === rel.source);
      let tab2 = this.model.tables.find(t => t.name === rel.target);
      let fld1 = tab1?.fields.find(fld => fld.primary_key);
      let fld2 = tab2?.fields.find(fld => fld.primary_key);
      let relName = camel_case(rel.name);
      let S = camel_case(rel.source);
      let T = camel_case(rel.target);
      let S_F = camel_case(fld1.name);
      let T_F = camel_case(fld2.name);

      if (rel.type === RelationshipCardinality.MANY_TO_MANY) {
        if (fld1 && fld2) {
          code.push(this.createTable({
            name: rel.name, fields: [
              {name: S_F, type: fld1.type, primary_key: true},
              {name: T_F, type: fld2.type, primary_key: true}
            ]
          }));
          code.push(this.fk(relName, S_F, S));
          code.push(this.fk(relName, T_F, T));
        } else code.push('you must have a primary key column on both tables');
      } else {
        if (rel.type === RelationshipCardinality.ONE_TO_MANY || rel.type === RelationshipCardinality.ONE_TO_ONE) {
          if (fld2) {
            code.push(this.add_column(S, T_F, MySQLType[fld2.type]) + '\n' + this.fk(S, T_F, T));
          } else code.push(this.err(rel, 'target table [' + rel.target + '] must have a primary key column'));
        }
        if (rel.type === RelationshipCardinality.MANY_TO_ONE || rel.type === RelationshipCardinality.ONE_TO_ONE) {
          if (fld1) {
            code.push(this.add_column(T, S_F, MySQLType[fld1.type]) + '\n' + this.fk(T, S_F, S));
          } else code.push(this.err(rel, 'source table [' + rel.source + '] must have a primary key column'));
        }
      }
    });
    return code.join('\n\n');
  }

  add_column(tab, column, type): string {
    return `ALTER TABLE ${tab} ADD ${column} ${type};`;
  }

  fk(tab, src, tabRef, ref?): string {
    return `ALTER TABLE ${tab} ADD FOREIGN KEY(${src})\n    REFERENCES ${tabRef}(${ref ? ref : src}) ON UPDATE CASCADE ON DELETE CASCADE;`;
  }

  createTable(tab: TableModel): string {
    const fields: string[] = [];
    let p: string[];
    tab.fields.forEach(fld => {
      p = [];
      p.push(camel_case(fld.name));
      p.push(MySQLType[fld.type]);
      if (fld.primary_key) p.push('PRIMARY KEY');
      if (fld.auto_increment) p.push('AUTO_INCREMENT');
      if (fld.unique && !fld.primary_key) p.push('UNIQUE');
      if (!fld.nullable && !fld.primary_key) p.push('NOT NULL');
      fields.push('    ' + p.join(' '));
    });
    return `CREATE TABLE ${camel_case(tab.name)} (\n${fields.join(',\n')}\n) ENGINE = INNODB;`;
  }
}
