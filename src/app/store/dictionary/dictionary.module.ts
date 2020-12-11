import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxsModule} from '@ngxs/store';
import {DictionaryState} from './dictionary.state';
import {DictionaryService} from './dictionary.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forFeature([
      DictionaryState
    ])
  ],
  providers: [
    DictionaryService,
  ]
})
export class DictionaryModule {
}
