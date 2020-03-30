import {Component, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Model, MySQLType, TableModel} from '../../services/model.service';
import {RelationshipCardinality} from '../../model-tools/relationship/relationship.component';

@Component({
  selector: 'java',
  templateUrl: './java.component.html',
  styleUrls: ['./java.component.scss']
})
export class JavaComponent implements OnInit {
  @Input() model: Model;
  packageN = 'database';
  relTables: TableModel[] = [];
  tables: TableModel[] = [];

  ngOnInit(): void {
    this.model?.relationships.forEach(rel => {
      if (rel.type === RelationshipCardinality.MANY_TO_MANY) {
        this.relTables.push({
          name: rel.name,
          fields: [
            {
              name: rel.source,
              type: rel.source
            },
            {
              name: rel.target,
              type: rel.target
            }
          ]
        });
      }
    });
  }

  format(source: string) {
    source = source.replace(/[\t ]+/g, ' ');
    source = source.replace(/[\n]+/g, '');
    let indent = 0;
    const SOURCE = source.split('');
    let line: string[] = [];
    const lines: string[] = [];
    SOURCE.forEach(char => {
      if (!(char === ' ' && line.length === 0)) {
        line.push(char);
        if (char === '}') indent--;
        if (char.search(/[;{}]/g) !== -1) {
          lines.push('    '.repeat(indent) + line.join(''));
          lines.push('');
          line = [];
        }
        if (char === '{') indent++;
      }
    });
    return lines.join('\n');
  }

  convert(table: TableModel) {
    const constrcuct: string[] = [];
    let tp: string;
    let code = '';
    if (this.packageN) code += this.package(this.model.name, this.packageN);
    code += this.class(table.name) + ' {';
    table.fields.forEach(field => {
      tp = this.getType(field.type);
      constrcuct.push(tp + ' ' + this.case(field.name));
      code += this.property(this.case(field.name), tp);
    });
    this.model.relationships.forEach(rel => {
      tp = '';
      if (rel.source === table.name) {
        if (rel.type === RelationshipCardinality.ONE_TO_ONE) {
          tp = this.case(rel.target, true);
        } else if (rel.type === RelationshipCardinality.ONE_TO_MANY) {
          tp = this.case(rel.target, true) + '[]';
        }
        if (tp !== '') {
          constrcuct.push(tp + ' ' + this.case(rel.target));
          code += this.property(this.case(rel.target), tp);
        }
      }
    });
    code += 'public ' + this.case(table.name, true) + '(' + constrcuct.join(', ') + ') {';
    table.fields.forEach(fld => {
      code += 'this.' + this.case(fld.name) + ' = ' + this.case(fld.name) + ';';
    });
    code += '}';
    constrcuct.forEach(fld => {
      const t = fld.split(' ')[0];
      const f = fld.split(' ')[1];
      code += `public ${t} get${this.case(f, true)}() { return this.${f}; }`;
      code += `public void set${this.case(f, true)}(${t} ${f}) { this.${f} = ${f}; }`;
    });
    code += '}';
    return this.format(code);
  }

  getType(mySQLType: MySQLType | string): string {
    if (typeof(mySQLType) === 'string') {
      return this.case(mySQLType, true);
    } else {
      switch (mySQLType) {
        case MySQLType.VARCHAR:
        case MySQLType.CHAR: return 'String';
        case MySQLType.TIMESTAMP:
        case MySQLType.BLOB:
        case MySQLType.DATE_TIME:
        case MySQLType.TIME:
        case MySQLType.DATE: return 'java.util.Date';
        case MySQLType.DECIMAL: return 'double';
        case MySQLType.INTEGER: return 'int';
        default: return 'Object';
      }
    }
  }

  property(st: string, type: string) {
    return 'private ' + type + ' ' + this.case(st) + ';';
  }

  class(st: string) {
    return 'public class ' + this.case(st, true);
  }

  package(st: string, packageN: string) {
    return 'package ' + packageN + '.' + this.case(st) + ';';
  }

  case(st: string, cap?: boolean) {
    if (st.includes(' ')) st.replace(/[ ]{2,}/g, ' ');
    st = st.toLowerCase();
    const St: string[] = st.split('');
    for (let i in St) {
      if (St[i] === ' ') St[parseInt(i) + 1] = St[parseInt(i) + 1].toUpperCase();
    }
    if (cap) St[0] = St[0].toUpperCase();
    return St.join('').replace(' ', '');
  }
}

@Pipe({name: 'append'}) export class AppendArrayPipe<E> implements PipeTransform {
  transform(source: E[], ...arrays: E[][]): E[] {
    arrays.forEach(value => {
      value.forEach(value1 => source.push(value1));
    });
    return source;
  }
}
