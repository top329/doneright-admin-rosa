import { ListDataResponse } from "./global";
export interface LanguageDataType {
  id: number;
  languageFlag?: string;
  languageName: string;
  textDirection: string;
}

export interface LanguageResponse
  extends ListDataResponse<LanguageDataType[]> {}
