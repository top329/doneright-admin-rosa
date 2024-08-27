import { ApiResponse } from "@/types/global";
import { rootApi } from "../api";
import {
  MerchantResponse,
  MerchantPaymentListResponse,
  CountryListResponse,
  AddPaymentProps,
  CurrencyListResponse,
} from "@/types/merchant";
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

interface MerchantProps {
  merchant: MerchantResponse | null;
  merchantPaymentList: MerchantPaymentListResponse | null;
  countryList: CountryListResponse | [];
  currencyList: CurrencyListResponse | [];
}

const initialState: MerchantProps = {
  merchant: null,
  merchantPaymentList: null,
  countryList: [],
  currencyList: [],
};

export const merchantApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getMerchantData: build.mutation<
      ApiResponse<MerchantResponse>,
      { pageNumber: number; pageSize: number }
    >({
      query: (arg: { pageNumber: number; pageSize: number }) => ({
        url: `/admin/merchant/list?pageNumber=${arg.pageNumber}&pageSize=${arg.pageSize}`, // now we pass parameters in the url
        method: "GET",
      }),
      invalidatesTags: ["Merchant"],
    }),
    getMerchantPaymentList: build.mutation<
      ApiResponse<MerchantPaymentListResponse>,
      { pageNumber: number; pageSize: number }
    >({
      query: (arg: { pageNumber: number; pageSize: number }) => ({
        url: `/admin/merchant/payment/list?pageNumber=${arg.pageNumber}&pageSize=${arg.pageSize}`, // now we pass parameters in the url
        method: "GET",
      }),
      invalidatesTags: ["Merchant"],
    }),

    addMerchantPayment: build.mutation<ApiResponse<void>, AddPaymentProps>({
      query: (AddPaymentProps) => ({
        url: `/admin/merchant/payment/save`, // now we pass parameters in the url
        method: "POST",
        body: AddPaymentProps,
      }),
      invalidatesTags: ["Merchant"],
    }),

    getCountryList: build.mutation<ApiResponse<CountryListResponse>, {}>({
      query: () => ({
        url: `/admin/merchant/country/list`, // now we pass parameters in the url
        method: "GET",
      }),
      invalidatesTags: ["Merchant"],
    }),

    getCurrencyList: build.mutation<ApiResponse<CurrencyListResponse>, {}>({
      query: () => ({
        url: `/admin/merchant/currency/list`, // now we pass parameters in the url
        method: "GET",
      }),
      invalidatesTags: ["Merchant"],
    }),
  }),
});

export const merchant = createSlice({
  name: "merchant",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<MerchantProps>) => {
    builder.addMatcher(
      merchantApi.endpoints.getMerchantData.matchFulfilled,
      (state, action) => {
        state.merchant = action?.payload?.data;
        // state.dashboard = null;
      }
    );
    builder.addMatcher(
      merchantApi.endpoints.getMerchantPaymentList.matchFulfilled,
      (state, action) => {
        state.merchantPaymentList = action?.payload?.data;
        // state.dashboard = null;
      }
    );
    builder.addMatcher(
      merchantApi.endpoints.getCountryList.matchFulfilled,
      (state, action) => {
        state.countryList = action?.payload?.data;
        // state.dashboard = null;
      }
    );
    builder.addMatcher(
      merchantApi.endpoints.getCurrencyList.matchFulfilled,
      (state, action) => {
        state.currencyList = action?.payload?.data;
        // state.dashboard = null;
      }
    );
  },
}).reducer;

export const {
  useGetMerchantDataMutation,
  useGetMerchantPaymentListMutation,
  useGetCountryListMutation,
  useGetCurrencyListMutation,
  useAddMerchantPaymentMutation,
} = merchantApi;
