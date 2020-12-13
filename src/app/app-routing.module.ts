import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {UserResolver} from './store/user/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    resolve: [
      UserResolver
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
