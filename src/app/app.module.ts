import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {API_BASE_URL} from './tokens';
import {environment} from '../environments/environment';
import {NgxsModule} from '@ngxs/store';
import {StoreModule} from './store/store.module';
import {HttpClientModule} from '@angular/common/http';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {TableComponent} from './components/table/table.component';
import {MaterialModule} from './material/material.module';
import {DialogComponent} from './components/dialog/dialog/dialog.component';
import {DialogFormComponent} from './components/dialog/dialog-form/dialog-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from './shared/input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    TableComponent,
    DialogComponent,
    DialogFormComponent,
    InputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule,
    HttpClientModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: API_BASE_URL,
      useValue: environment.apiBaseUrl,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
