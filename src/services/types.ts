export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface Pagination {
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
}
