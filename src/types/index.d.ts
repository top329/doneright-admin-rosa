import type { MenuProps } from "antd";

export interface BranchDataType {
  key: string;
  name: string;
  branch: string;
  qr: string;
  visit: number;
  feedback: number;
}

export interface ContactDataType {
  key: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  rating: number;
}

export interface MoreDataType {
  key: string;
  date: string;
  nextDate: string;
  amount: string;
}

export interface CountryDataType {
  key: string;
  name: string;
  language: string;
  currency: string;
}

export interface LanguageDataType {
  key: string;
  name: string;
  direction: Boolean;
}

export interface TranslateDataType {
  key: string;
  base: string;
  trans: string;
  status: Boolean;
}
export type MenuItem = Required<MenuProps>["items"][number];
