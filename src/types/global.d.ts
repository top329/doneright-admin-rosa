export interface ApiResponse<T> {
  data: T;
  code: number;
  msg: string;
  token: string;
  expireDate: number;
  value?: string;
}

export interface ListDataResponse<T> {
  totalCnt: number;
  selectPageNumber: number;
  searchTotalCnt: number;
  list: T;
}

export type SpinnerProps = {
  loading: boolean;
  size?: "small" | "default" | "large";
  opacity?: number;
  background?: string;
};
