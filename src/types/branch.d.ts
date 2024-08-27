import { ListDataResponse } from "./global";
export interface BranchDataType {
  id: number;
  merchantName: string;
  branchName: string;
  qrUrl: string;
  visitCnt: number;
  feedbackCnt: number;
  status?: string;
}

export interface BranchResponse extends ListDataResponse<BranchDataType[]> {}
