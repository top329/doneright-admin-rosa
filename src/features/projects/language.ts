import { ApiResponse } from "@/types/global";
import { rootApi } from "../api";
import { LanguageResponse } from "@/types/language";
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";

interface LanguageProps {
  language: LanguageResponse | null;
}

const initialState: LanguageProps = {
  language: null,
};

export const languageApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getLanguageData: build.mutation<
      ApiResponse<LanguageResponse>,
      { pageNumber: number; pageSize: number }
    >({
      query: (arg: { pageNumber: number; pageSize: number }) => ({
        url: `/admin/language/list?pageNumber=${arg.pageNumber}&pageSize=${arg.pageSize}`, // now we pass parameters in the url
        method: "GET",
      }),
      invalidatesTags: ["Language"],
    }),
  }),
});

export const language = createSlice({
  name: "language",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<LanguageProps>) => {
    builder.addMatcher(
      languageApi.endpoints.getLanguageData.matchFulfilled,
      (state, action) => {
        state.language = action?.payload?.data;
        // state.dashboard = null;
      }
    );
  },
}).reducer;

export const { useGetLanguageDataMutation } = languageApi;
