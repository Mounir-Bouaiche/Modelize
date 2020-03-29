import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Model, ModelService, MySQLType, TableModel} from '../services/model.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {TableComponent} from '../model-tools/table/table.component';
import {Relationship} from '../model-tools/relationship/relationship.component';

const TEMPLATE = JSON.stringify({
  name: 'Table',
  fields: [{
    name: 'id',
    type: MySQLType.INTEGER
  }]
});

@Component({
  selector: 'model-editor',
  templateUrl: './model-editor.component.html',
  styleUrls: ['./model-editor.component.scss']
})
export class ModelEditorComponent implements OnInit, AfterViewInit {

  @ViewChildren('tableModel') tables: QueryList<TableComponent>;
  newTable: TableModel;
  selectedModel: Model;
  selectedTable: TableModel;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  newRel: Relationship;
  private space: HTMLElement;

  constructor(
    private modelService: ModelService,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {
  }

  ngOnInit(): void {
    this.selectedModel = this.modelService.getModel(this.route.snapshot.paramMap.get('model'));
    this.space = document.getElementById('model-space');
  }

  ngAfterViewInit() {
  }

  getTable(source: string): TableComponent {
    return this.tables.find(item => {
      return item.table.name === source;
    });
  }

  displayProp(table: TableModel) {
    this.selectedTable = table;
  }

  create_table() {
    this.newTable = (!this.newTable) ? JSON.parse(TEMPLATE) : undefined;
  }

  add_table($e: MouseEvent) {
    if (this.newTable) {
      this.newTable.pos = {
        x: $e.clientX - this.space.getBoundingClientRect().x,
        y: $e.clientY - this.space.getBoundingClientRect().y
      };
      const l = this.selectedModel.tables.push(this.newTable);
      this.selectedTable = this.selectedModel.tables[l - 1];
      this.newTable = undefined;
    } else {
      this.selectedTable = undefined;
    }
  }

  tableClicked(table: TableModel, $event: MouseEvent) {
    this.displayProp(table);
  }
}
