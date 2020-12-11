import {Action, State, StateContext} from '@ngxs/store';
import {DictionaryStateModel} from './dictionary.models';
import {DictionaryService} from './dictionary.service';
import {Injectable} from '@angular/core';
import {QueryAccountStatusTypes, QueryAccountTypes, QueryCurrencyTypes, QueryGenders} from './dictionary.actions';
import {tap} from 'rxjs/operators';

@State<DictionaryStateModel>({
  name: 'dictionary',
  defaults: {
    genders: [],
    accountTypes: [],
    currencyTypes: [],
    accountStatusTypes: []
  }
})
@Injectable()
export class DictionaryState {
  constructor(
    private dictionaryService: DictionaryService
  ) {
  }

  @Action(QueryGenders)
  queryGenders({setState, getState}: StateContext<DictionaryStateModel>) {
    return this.dictionaryService.queryGenders()
      .pipe(
        tap(genders => {
            const state = getState();
            setState({
              ...state,
              genders
            });
          }
        )
      );
  }

  @Action(QueryAccountTypes)
  queryAccountTypes({setState, getState}: StateContext<DictionaryStateModel>) {
    return this.dictionaryService.queryAccountTypes()
      .pipe(
        tap(accountTypes => {
          const state = getState();
          setState({
            ...state,
            accountTypes
          });
        })
      );
  }

  @Action(QueryCurrencyTypes)
  qoueryCurrencyTypes({setState, getState}: StateContext<DictionaryStateModel>) {
    return this.dictionaryService.queryCurrencyTypes()
      .pipe(
        tap(currencyTypes => {
          const state = getState();
          setState({
            ...state,
            currencyTypes
          });
        })
      );
  }

  @Action(QueryAccountStatusTypes)
  queryAccountStatusTypes({setState, getState}: StateContext<DictionaryStateModel>) {
    return this.dictionaryService.queryCurrencyTypes()
      .pipe(
        tap(accountStatusTypes => {
          const state = getState();
          setState({
            ...state,
            accountStatusTypes
          });
        })
      );
  }
}
