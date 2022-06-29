export type IResponse<T> = {
  status: number;
  data?: T;
  error?: string;
};
