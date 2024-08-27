import { ApiResponse } from "@/types/global";
import { rootApi } from "../api";
import { CustomerResponse } from "@/types/customer";
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

interface CustomerProps {
  customer: CustomerResponse | null;
}

const initialState: CustomerProps = {
  customer: null,
};

export const customerApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getCustomerData: build.mutation<
      ApiResponse<CustomerResponse>,
      { pageNumber: number; pageSize: number }
    >({
      query: (arg: { pageNumber: number; pageSize: number }) => ({
        url: `/admin/customer/list?pageNumber=${arg.pageNumber}&pageSize=${arg.pageSize}`, // now we pass parameters in the url
        method: "GET",
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const customer = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<CustomerProps>) => {
    builder.addMatcher(
      customerApi.endpoints.getCustomerData.matchFulfilled,
      (state, action) => {
        state.customer = action?.payload?.data;
        // state.dashboard = null;
      }
    );
  },
}).reducer;

export const { useGetCustomerDataMutation } = customerApi;
