import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserModule} from './user/user.module';
import {DictionaryModule} from './dictionary/dictionary.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserModule,
    DictionaryModule
  ],
  providers: []
})
export class StoreModule {
}
