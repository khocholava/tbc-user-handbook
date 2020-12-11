export interface User {
  clientNumber: number;
  firstName: string;
  lastName: string;
  gender: Gender;
  id: number;
  phoneNumber: string;
  image: string;
  legalAddress: UserAddress;
  actualAddress: UserAddress;
  account: Array<Account>;
}


export interface UserAddress {
  country: string;
  city: string;
  address: string;
}

export interface Gender {
  id: number;
  value: string;
}
