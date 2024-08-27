import { ListDataResponse } from "./global";
export interface CountryDataType {
  id: number;
  countryFlag?: string;
  countryName: string;
  language: string;
  currency: string;
}

export interface CountryResponse extends ListDataResponse<CountryDataType[]> {}
