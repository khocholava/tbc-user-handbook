import {Selector} from '@ngxs/store';
import {DictionaryStateModel} from './dictionary.models';
import {DictionaryState} from './dictionary.state';

export class DictionarySelectors {
  @Selector([DictionaryState])
  static queryGenders(state: DictionaryStateModel) {
    return state.genders;
  }

  @Selector([DictionaryState])
  static getCurrencyTypes(state: DictionaryStateModel) {
    return state.currencyTypes;
  }

  @Selector([DictionaryState])
  static getAccountTypes(state: DictionaryStateModel) {
    return state.accountTypes;
  }

  @Selector([DictionaryState])
  static getAccountStatusTypes(state: DictionaryStateModel) {
    return state.accountStatusTypes;
  }

}
