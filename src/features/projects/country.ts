import { ApiResponse } from "@/types/global";
import { rootApi } from "../api";
import { CountryResponse } from "@/types/country";
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

interface CountryProps {
  country: CountryResponse | null;
}

const initialState: CountryProps = {
  country: null,
};

export const countryApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getCountryData: build.mutation<
      ApiResponse<CountryResponse>,
      { pageNumber: number; pageSize: number }
    >({
      query: (arg: { pageNumber: number; pageSize: number }) => ({
        url: `/admin/country/list?pageNumber=${arg.pageNumber}&pageSize=${arg.pageSize}`, // now we pass parameters in the url
        method: "GET",
      }),
      invalidatesTags: ["Country"],
    }),
  }),
});

export const country = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<CountryProps>) => {
    builder.addMatcher(
      countryApi.endpoints.getCountryData.matchFulfilled,
      (state, action) => {
        state.country = action?.payload?.data;
        // state.dashboard = null;
      }
    );
  },
}).reducer;

export const { useGetCountryDataMutation } = countryApi;
