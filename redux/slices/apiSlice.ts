import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  id: string;
  isAuth?: boolean;
  username?: string;
  email?: string;
  profileImage?: string;
  coverImage?: string;
}

interface Password {
  id: string;
  isAuth?: boolean;
  currentPassword: string;
  newPassword: string;
}

interface Email {
  id: string;
  isAuth?: boolean;
  email: string;
}

interface Image {
  id: string;
  isAuth?: boolean;
  image: string;
}

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id) => `/user?id=${id}`,
    }),
    updateUsername: builder.mutation<void, User>({
      query: (user: User) => ({
        url: `/user?id=${user.id}`,
        method: "PATCH",
        body: { username: user.username },
      }),
    }),
    updatePassword: builder.mutation<void, Password>({
      query: (password: Password) => ({
        url: `/user?id=${password.id}`,
        method: "PATCH",
        body: {
          currentPassword: password.currentPassword,
          newPassword: password.newPassword,
        },
      }),
    }),
    updateEmail: builder.mutation<void, Email>({
      query: (email: Email) => ({
        url: `/user?=${email.id}`,
        method: "PATCH",
        body: { email: email.email },
      }),
    }),
    updateProfileImage: builder.mutation<void, Image>({
      query: (image: Image) => ({
        url: `/user?id=${image.id}`,
        method: "PATCH",
        body: { profileImage: image.image },
      }),
    }),
    updateCoverImage: builder.mutation<void, Image>({
      query: (image: Image) => ({
        url: `/user?id=${image.id}`,
        method: "PATCH",
        body: { coverImage: image.image },
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUsernameMutation,
  useUpdatePasswordMutation,
  useUpdateEmailMutation,
  useUpdateProfileImageMutation,
  useUpdateCoverImageMutation,
} = apiSlice;
