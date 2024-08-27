import { ListDataResponse } from "./global";

export interface MerchantDataType {
  id: number;
  countryFlag?: string;
  countryName: string;
  currency: string;
  status: string;
  state: string;
  email: string;
  phone: string;
  createDate: string;
  merchantName: string;
  nextPayDate: string;
  nextPayAmount: string;
  branchCnt: number;
  lastPayDate: string;
  lastPayAmount: string;
  maxScanCnt: number;
}

export interface MerchantPaymentDataType {
  payDate: string;
  nextPayDate: string;
  payAmount: string;
}

export interface CountryDataType {
  id: number;
  countryFlag: string;
  countryCode: string;
  countryName: string;
}
export interface CurrencyDataType {
  id: number;
  code: string;
  symbol: string;
}
export interface AddPaymentProps {
  merchantId?: number;
  payAmount: number;
  nextPayDate: string;
}
export interface MerchantResponse
  extends ListDataResponse<MerchantDataType[]> {}

export interface MerchantPaymentListResponse
  extends ListDataResponse<MerchantPaymentDataType[]> {}

export interface CountryListResponse extends Array<CountryDataType> {}
export interface CurrencyListResponse extends Array<CurrencyDataType> {}
