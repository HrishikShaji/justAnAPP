import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  id: string;
  isAuth?: boolean;
  username?: string;
  email?: string;
  profileImage?: string;
  coverImage?: string;
  followerIds: string[];
  followingIds: string[];
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

interface Like {
  postId: string;
}

interface Follow {
  userId: string;
}

interface Comment {
  postId: string;
  body: string;
}

interface UserPost {
  id: string;
  page: number;
}

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Posts", "User", "Comments"],
  endpoints: (builder) => ({
    getUser: builder.query<any, string>({
      query: (id) => `/user/${id}`,
      providesTags: ["User"],
    }),
    updateUsername: builder.mutation<void, Username>({
      query: (user: Username) => ({
        url: `/user/${user.id}`,
        method: "PUT",
        body: {
          username: user.username,
        },
      }),
      invalidatesTags: ["User"],
    }),
    updatePassword: builder.mutation<void, Password>({
      query: (password: Password) => ({
        url: `/user/${password.id}`,
        method: "PUT",
        body: {
          currentPassword: password.currentPassword,
          newPassword: password.newPassword,
        },
      }),
    }),

    updateProfileImage: builder.mutation<void, Image>({
      query: (image: Image) => ({
        url: `/user/${image.id}`,
        method: "PUT",
        body: {
          profileImage: image.image,
        },
      }),
      invalidatesTags: ["User"],
    }),
    updateCoverImage: builder.mutation<void, Image>({
      query: (image: Image) => ({
        url: `/user/${image.id}`,
        method: "PUT",
        body: {
          coverImage: image.image,
        },
      }),
      invalidatesTags: ["User"],
    }),
    getPost: builder.query<any, string>({
      query: (id: string) => `/posts/${id}`,
      providesTags: ["User"],
    }),
    getPosts: builder.query<any, number>({
      query: (page: number) => `/posts?page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        console.log("from redux", currentCache, newItems);
        currentCache.posts.push(...newItems.posts);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ["Posts"],
    }),
    getUserPosts: builder.query<any, UserPost>({
      query: ({ id, page }) => `/user/${id}?page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        console.log("from redux", currentCache, newItems);
        currentCache.posts.push(...newItems.posts);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    addPost: builder.mutation<void, Post>({
      query: (post: Post) => ({
        url: `/posts/${post.id}`,
        method: "POST",
        body: { body: post.body },
      }),
      invalidatesTags: ["Posts"],
    }),
    addLike: builder.mutation<void, Like>({
      query: (user) => ({
        url: "/like",
        method: "POST",
        body: { postId: user.postId },
      }),
      invalidatesTags: ["User"],
    }),
    removeLike: builder.mutation<void, Like>({
      query: (user) => ({
        url: "/like",
        method: "DELETE",
        body: { postId: user.postId },
      }),
      invalidatesTags: ["User"],
    }),
    follow: builder.mutation<void, Follow>({
      query: (user) => ({
        url: "/follow",
        method: "POST",
        body: { userId: user.userId },
      }),
      invalidatesTags: ["User"],
    }),
    unFollow: builder.mutation<void, Follow>({
      query: (user) => ({
        url: "/follow",
        method: "DELETE",
        body: { userId: user.userId },
      }),
      invalidatesTags: ["User"],
    }),
    getComments: builder.query<any, string>({
      query: (postId: string) => `/comment/${postId}`,
      providesTags: ["Comments"],
    }),
    addComment: builder.mutation<void, Comment>({
      query: (comment) => ({
        url: "/comment",
        method: "POST",
        body: { postId: comment.postId, body: comment.body },
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUsernameMutation,
  useUpdatePasswordMutation,
  useUpdateProfileImageMutation,
  useUpdateCoverImageMutation,
  useGetPostQuery,
  useAddPostMutation,
  useGetPostsQuery,
  useGetUserPostsQuery,
  useAddLikeMutation,
  useRemoveLikeMutation,
  useFollowMutation,
  useUnFollowMutation,
  useGetCommentsQuery,
  useAddCommentMutation,
} = apiSlice;
