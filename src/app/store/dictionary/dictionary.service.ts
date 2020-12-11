import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Gender} from '../../models/user';
import {API_BASE_URL} from '../../tokens';
import {AccountStatusType, AccountType, CurrencyType} from '../../models/account';

@Injectable()
export class DictionaryService {

  constructor(
    readonly http: HttpClient,
    @Inject(API_BASE_URL) readonly baseUrl: string
  ) {
  }

  queryCurrencyTypes(): Observable<Array<CurrencyType>> {
    return this.http.get<Array<CurrencyType>>(`${this.baseUrl}/accountTypes`);
  }

  queryAccountStatusTypes(): Observable<Array<AccountStatusType>> {
    return this.http.get<Array<AccountStatusType>>(`${this.baseUrl}/accountStatusTypes`);
  }

  queryGenders(): Observable<Array<Gender>> {
    return this.http.get<Array<Gender>>(`${this.baseUrl}/genders`);
  }

  queryAccountTypes(): Observable<Array<AccountType>> {
    return this.http.get<Array<AccountType>>(`${this.baseUrl}/accountTypes`);
  }
}
