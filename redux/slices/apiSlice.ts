import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  id: string;
  isAuth: boolean;
  email: string;
}

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id) => `/user?id=${id}`,
    }),
    updateUser: builder.mutation<void, User>({
      query: (user: User) => ({
        url: `/user?id=${user.id}`,
        method: "PATCH",
        body: { email: user.email },
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = apiSlice;
