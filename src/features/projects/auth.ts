import { createSlice } from "@reduxjs/toolkit";
import { rootApi } from "../api";
import { SignInProps, UserResponse } from "@/types/auth";
import { ApiResponse } from "@/types/global";

interface AuthInitialProps {
  member: UserResponse | null;
}

const initialState: AuthInitialProps = {
  member: null,
};

export const authApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    setRequestLogin: build.mutation<ApiResponse<void>, SignInProps>({
      query: (LoginProps) => ({
        url: "/auth/admin/signin",
        method: "POST",
        body: LoginProps,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      typeof window !== "undefined" && window.sessionStorage.clear();
      typeof window !== "undefined" && window.localStorage.clear();
      typeof window !== "undefined" && window.location.replace("/signin");
    },
  },
  // extraReducers: (builder: ActionReducerMapBuilder<AuthInitialProps>) => {
  //   builder.addMatcher(
  //     authApi.endpoints.setRequestLogin.matchFulfilled,
  //     (state, action) => {
  //       state.member = action?.payload?.data;
  //     }
  //   );
  // },
});

export const { logout } = auth.actions;
export const { useSetRequestLoginMutation } = authApi;
