"use server";

import axios from "axios";

const apiClient = axios.create({
  timeout: 10000,
  baseURL: process.env.SEARCH_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
