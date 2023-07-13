import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { baseAPI } from "../../Shared/store/api/baseURL";

export const registratorApi = createApi({
  reducerPath: "registratorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseAPI,
    prepareHeaders: (headers) => {
      const item: any = localStorage.getItem("responseData");
      const tokens = JSON.parse(item);

      const Authorization = `Bearer ${tokens.access}`;
      headers.set("Authorization", Authorization);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTicketsFor: builder.mutation({
      query: (date) => ({
        url: "/registrator/ticket-history-served-today/",
        method: "POST",
        body: date,
      }),
    }),
    getOperatorsList: builder.query({
      query: () => ({
        url: "/operators/operator_list/",
        method: "GET",
      }),
    }),
    getReservedTicketsList: builder.query({
      query: () => ({
        url: "/registrator/tickets_list/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTicketsForMutation } = registratorApi;
export const {
  useGetOperatorsListQuery,
  useGetReservedTicketsListQuery,
} = registratorApi;
