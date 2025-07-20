import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Task } from "@entities/task/model/TaskProps";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://task-tracker-lhr6.onrender.com" }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => "",
      providesTags: ["Task"],
    }),
    getTaskById: builder.query<Task, number>({
      query: (id) => `${id}`,
      providesTags: ["Task"],
    }),
    addTask: builder.mutation<Task, Omit<Task, "id">>({
      query: (newTaskData) => ({
        url: "",
        method: "POST",
        body: newTaskData,
      }),
      invalidatesTags: ["Task"],
    }),

    updateTask: builder.mutation<Task, { id: number; updates: Partial<Task> }>({
      query: ({ id, updates }) => ({
        url: `${id}`,
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: ["Task"],
    }),

    deleteTask: builder.mutation<number, number>({
      query: (taskId) => ({
        url: `${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
