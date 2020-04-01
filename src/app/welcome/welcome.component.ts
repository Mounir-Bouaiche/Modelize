import {Component, Inject, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Model, ModelService} from '../services/model.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {
  searchWord = '';
  models: Model[];

  constructor(private modelService: ModelService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.models = this.modelService.getModels();
  }

  openModal() {
    this.dialog.open(ModalComponent, {
      maxWidth: '500px',
      data: ''
    });
  }
}

@Component({
  selector: '', template: `
    <h1 mat-dialog-title>Type a name for your new model</h1>
    <div mat-dialog-content>
      <mat-form-field appearance="outline" class="blc">
        <mat-label>Model Name</mat-label>
        <input matInput [(ngModel)]="data" required>
        <mat-error>You must specify a name for the new model</mat-error>
      </mat-form-field>
    </div>
    <div mat-dialog-actions style="margin-bottom: -16px;">
      <button mat-button (click)="closeDialog()" class="grow w3-border">Cancel</button>
      <button mat-raised-button color="accent" [mat-dialog-close]="data" [disabled]="!data" (click)="add_model()">Create Model</button>
    </div>
  `
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: string,
    private modelService: ModelService,
    private router: Router
  ) {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  add_model() {
    this.modelService.getModels().push({
      id: '1',
      name: this.data,
      tables: [],
      relationships: []
    });
    this.closeDialog();
    this.router.navigate(['/editor', this.data]).then(() => {
    });
  }
}

@Pipe({name: 'filterBy'})
export class FilterByPipe implements PipeTransform {
  transform(value: Model[], word: string): any {
    if (!word) {
      return value;
    } else {
      return value.filter(model => {
        return model.name.toLowerCase().search(word.toLowerCase()) !== -1;
      });
    }
  }
}
