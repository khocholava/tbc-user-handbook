import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxsModule} from '@ngxs/store';
import {UserState} from './user.state';
import {UserService} from './user.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forFeature([
      UserState
    ])
  ],
  providers: [
    UserService,
  ]
})
export class UserModule {
}
