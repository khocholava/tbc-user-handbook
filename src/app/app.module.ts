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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from './shared/input/input.component';
import {TranslocoRootModule} from './transloco/transloco-root.module';
import {DialogAddressFormComponent} from './components/dialog/dialog-address-form/dialog-address-form.component';
import {TextComponent} from './shared/text/text.component';
import {AccountFormComponent} from './components/dialog/account-form/account-form.component';
import {MdePopoverModule} from '@material-extended/mde';
import {QueryFormComponent} from './components/dialog/query-form/query-form.component';
import {InputErrorPipe} from './shared/pipes/input-error.pipe';
import {ConfirmationBoxComponent} from './components/dialog/confirmation-box/confirmation-box.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    TableComponent,
    DialogComponent,
    InputComponent,
    DialogAddressFormComponent,
    TextComponent,
    AccountFormComponent,
    QueryFormComponent,
    InputErrorPipe,
    ConfirmationBoxComponent,
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
    FormsModule,
    TranslocoRootModule,
    MdePopoverModule,
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
