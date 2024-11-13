export interface ApiResponse<T = unknown> {
  data?: T;
  status: number;
  message?: string;
  error?: string;
}

export interface RequestStatus<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}
