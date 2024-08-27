import { ListDataResponse } from "./global";
export interface CustomerDataType {
  id: number;
  merchantName: string;
  customerName: string;
  phone: string;
  email: string;
  rateCount: string;
}

export interface CustomerResponse
  extends ListDataResponse<CustomerDataType[]> {}
