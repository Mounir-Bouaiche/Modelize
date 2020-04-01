import {Component} from '@angular/core';

@Component({
  selector: 'main-page',
  template: `
    <mat-toolbar color="primary">
      <span>S4 Angular Project</span>
    </mat-toolbar>
    <div class="card-container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class MainPageComponent {
}
