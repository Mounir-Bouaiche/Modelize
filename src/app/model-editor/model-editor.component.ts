import {AfterViewInit, Component, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Model, ModelService, MySQLType, TableModel} from '../services/model.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {TableComponent} from '../model-tools/table/table.component';
import {Relationship, RelationshipCardinality} from '../model-tools/relationship/relationship.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

const TEMPLATE_TABLE = JSON.stringify({
  name: 'Table',
  fields: [{
    name: 'id',
    type: MySQLType.INTEGER
  }]
});

const TEMPLATE_REL = JSON.stringify({
  id: 'auto',
  type: RelationshipCardinality.ONE_TO_ONE,
  source: '',
  target: ''
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
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog
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
    if (! this.newRel) {
      this.displayProp(table);
    } else {
      this.newRel.source = table.name;
    }
  }

  create_table() {
     if (this.newRel) {
       this.newRel = undefined;
     }
     this.newTable = (!this.newTable) ? JSON.parse(TEMPLATE_TABLE) : undefined;
  }

  create_rel() {
    if (this.newTable) this.newTable = undefined;
    this.newRel = (!this.newRel) ? JSON.parse(TEMPLATE_REL) : undefined;
  }

  targetSelected(table: TableModel) {
    if (this.newRel) {
      if (this.newRel.source !== table.name) {
        this.newRel.target = table.name;
        this.dialog.open(NewRelModalComponent, {
          maxWidth: '500px',
          data: {
            selectedModel: this.selectedModel,
            rel: this.newRel
          }
        }).afterClosed().subscribe(() => {
          this.newRel = undefined;
        });
      } else this.newRel.source = '';
    }
  }

  trackTables(index: number, table: TableModel) { return table.name; }

  deleteTable($event: MouseEvent, tablePos: number, tab: TableModel) {
    $event.stopPropagation();
    this.selectedModel.relationships = this.selectedModel.relationships.filter(rel => rel.source !== tab.name && rel.target !== tab.name);
    this.selectedModel.tables.splice(tablePos, 1);
    this.selectedTable = undefined;
  }
}

@Component({
  selector: '',
  template: `
    <h1 mat-dialog-title>RelationShip Properties</h1>
    <div mat-dialog-content>
      <mat-form-field appearance="outline" class="blc">
        <mat-label>RelationShip Name</mat-label>
        <input matInput [(ngModel)]="data.rel.name">
      </mat-form-field>
      <mat-form-field appearance="outline" class="blc">
        <mat-label>Table Source</mat-label>
        <mat-select [(value)]="data.rel.source">
          <mat-option *ngFor="let table of data.selectedModel.tables" [value]="table.name">{{ table.name }}</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="outline" class="blc">
        <mat-label>Table Target</mat-label>
        <mat-select [(value)]="data.rel.target">
          <mat-option *ngFor="let table of data.selectedModel.tables" [value]="table.name">{{ table.name }}</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="outline" class="blc">
        <mat-label>Cardinality</mat-label>
        <mat-select [(value)]="data.rel.type">
          <mat-option *ngFor="let type of relTypes" [value]="type">{{ type }}</mat-option>
        </mat-select>
      </mat-form-field>
    </div>
    <div mat-dialog-actions style="margin-bottom: -16px;">
      <button mat-button (click)="closeDialog()" class="grow w3-border">Cancel</button>
      <button mat-raised-button color="accent" [mat-dialog-close]="data"
              [disabled]="!data.rel.name || data.rel.source === data.rel.target" (click)="addRel()">
        Confirm
      </button>
    </div>
  `
})
export class NewRelModalComponent implements OnInit {
  relTypes: RelationshipCardinality[];

  constructor(
    public dialogRef: MatDialogRef<NewRelModalComponent>, @Inject(MAT_DIALOG_DATA) public data: {
      selectedModel: Model,
      rel: Relationship
    }
  ) {
  }

  ngOnInit() {
    this.relTypes = [
      RelationshipCardinality.ONE_TO_ONE,
      RelationshipCardinality.ONE_TO_MANY,
      RelationshipCardinality.MANY_TO_ONE,
      RelationshipCardinality.MANY_TO_MANY
    ];
  }

  addRel() {
    this.data.selectedModel.relationships.push(this.data.rel);
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
