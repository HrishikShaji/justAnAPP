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

interface Username {
  id: string;
  isAuth?: boolean;
  username: string;
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

interface Post {
  id: string;
  isAuth?: boolean;
  body: string;
}

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id) => `/user?id=${id}`,
    }),
    updateUsername: builder.mutation<void, Username>({
      query: (user: Username) => ({
        url: `/user?endpoint=updateUsername`,
        method: "PUT",
        body: {
          id: user.id,
          username: user.username,
        },
      }),
    }),
    updatePassword: builder.mutation<void, Password>({
      query: (password: Password) => ({
        url: `/user?endpoint=updatePassword`,
        method: "PUT",
        body: {
          id: password.id,
          currentPassword: password.currentPassword,
          newPassword: password.newPassword,
        },
      }),
    }),
    updateEmail: builder.mutation<void, Email>({
      query: (email: Email) => ({
        url: `/user?endpoint=updateEmail`,
        method: "PUT",
        body: {
          id: email.id,
          email: email.email,
        },
      }),
    }),
    updateProfileImage: builder.mutation<void, Image>({
      query: (image: Image) => ({
        url: `/user?endpoint=updateProfileImage`,
        method: "PUT",
        body: {
          id: image.id,
          profileImage: image.image,
        },
      }),
    }),
    updateCoverImage: builder.mutation<void, Image>({
      query: (image: Image) => ({
        url: `/user?endpoint=updateCoverImage`,
        method: "PUT",
        body: {
          id: image.id,
          coverImage: image.image,
        },
      }),
    }),
    getPost: builder.query<any, string>({
      query: (id: string) => `/posts?postId=${id}`,
    }),
    getPosts: builder.query<any, void>({
      query: () => "/posts?endpoint=getPosts",
    }),
    getUserPosts: builder.query<any, string>({
      query: (id: string) => `/posts?endpoint=getPosts&userId=${id}`,
    }),
    addPost: builder.mutation<void, Post>({
      query: (post: Post) => ({
        url: "/posts?endpoint=addPost",
        method: "POST",
        body: { id: post.id, body: post.body },
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
  useGetPostQuery,
  useAddPostMutation,
  useGetPostsQuery,
  useGetUserPostsQuery,
} = apiSlice;
