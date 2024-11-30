export interface RequestResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: boolean;
  status?: number;
}
