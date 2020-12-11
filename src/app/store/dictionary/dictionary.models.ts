import {Gender} from '../../models/user';
import {AccountStatusType, AccountType, CurrencyType} from '../../models/account';

export interface DictionaryStateModel {
  currencyTypes: Array<CurrencyType> | null;
  accountTypes: Array<AccountType> | null;
  genders: Array<Gender> | null;
  accountStatusTypes: Array<AccountStatusType>;
}
