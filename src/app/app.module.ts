import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MainPageComponent} from './main-page/main-page.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {FilterByPipe, ModalComponent, WelcomeComponent} from './welcome/welcome.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {ModelEditorComponent, NewRelModalComponent} from './model-editor/model-editor.component';
import {TableComponent} from './model-tools/table/table.component';
import {RelationshipComponent} from './model-tools/relationship/relationship.component';
import {TablePropComponent} from './model-tools/table-prop/table-prop.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {ResultComponent } from './result/result.component';
import {SqlComponent} from './result/sql/sql.component';
import {AppendArrayPipe, JavaComponent} from './result/java/java.component';
import {MatTabsModule} from '@angular/material/tabs';

import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { PhpComponent } from './result/php/php.component';
export function getHighlightLanguages() {
  return {
    java: () => import('highlight.js/lib/languages/java'),
    php: () => import('highlight.js/lib/languages/php'),
    sql: () => import('highlight.js/lib/languages/sql')
  };
}

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    WelcomeComponent,
    ModelEditorComponent,
    TableComponent,
    RelationshipComponent,
    TablePropComponent,
    ModalComponent,
    NewRelModalComponent,
    ResultComponent,
    SqlComponent,
    JavaComponent,
    FilterByPipe,
    AppendArrayPipe,
    PhpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    DragDropModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    MatTabsModule,
    HighlightModule
  ],
  providers: [{
    provide: HIGHLIGHT_OPTIONS,
    useValue: {
      languages: getHighlightLanguages(),
      lineNumbers: true
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
