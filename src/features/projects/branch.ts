import { ApiResponse } from "@/types/global";
import { rootApi } from "../api";
import { BranchResponse } from "@/types/branch";
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

interface DashboardProps {
  branch: BranchResponse | null;
}

const initialState: DashboardProps = {
  branch: null,
};

export const branchApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getBranchData: build.mutation<
      ApiResponse<BranchResponse>,
      { pageNumber: number; pageSize: number }
    >({
      query: (arg: { pageNumber: number; pageSize: number }) => ({
        url: `/admin/branch/list?pageNumber=${arg.pageNumber}&pageSize=${arg.pageSize}`, // now we pass parameters in the url
        method: "GET",
      }),
      invalidatesTags: ["Branch"],
    }),
  }),
});

export const branch = createSlice({
  name: "branch",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<DashboardProps>) => {
    builder.addMatcher(
      branchApi.endpoints.getBranchData.matchFulfilled,
      (state, action) => {
        state.branch = action?.payload?.data;
        // state.dashboard = null;
      }
    );
  },
}).reducer;

export const { useGetBranchDataMutation } = branchApi;
