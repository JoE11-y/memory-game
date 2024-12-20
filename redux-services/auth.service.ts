import { LogInDataI, ProfileI } from "@/interfaces";
import config from "@/utils/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${config.SERVER_URL}/auth` }),
  endpoints: (builder) => ({
    signup: builder.mutation<any, LogInDataI>({
      query({ username, password }) {
        return {
          url: "/signup",
          method: "POST",
          body: {
            username,
            password,
          },
        };
      },
    }),
    login: builder.mutation<any, LogInDataI>({
      query({ username, password }) {
        return {
          url: "/login",
          method: "POST",
          body: {
            username,
            password,
          },
        };
      },
    }),
    getProfile: builder.query<ProfileI, { accessToken: string }>({
      query({ accessToken }) {
        return {
          url: "/profile",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
    updateUsername: builder.mutation<
      any,
      { accessToken: string; username: string }
    >({
      query({ accessToken, username }) {
        return {
          url: "/username",
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: {
            username,
          },
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useSignupMutation,
  useUpdateUsernameMutation,
} = authApi;
