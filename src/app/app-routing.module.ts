import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {ModelEditorComponent} from './model-editor/model-editor.component';
import {ResultComponent} from './result/result.component';


const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'editor/:model',
        component: ModelEditorComponent
      },
      {
        path: 'result/:model',
        component: ResultComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
