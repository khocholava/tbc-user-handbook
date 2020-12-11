export interface Account {
  accountNumber: number;
  clientNumber: number;
  accountType: AccountType;
  currency: CurrencyType;
  accountStatus: AccountStatusType;
}

export interface CurrencyType {
  id: number;
  value: string;
}
export interface AccountType  {
  id: number;
  value: string;
}
export interface AccountStatusType {
  id: number;
  value: string;
}
