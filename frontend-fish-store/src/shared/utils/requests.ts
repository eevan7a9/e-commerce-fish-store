interface HeaderOptsParams {
  token: string;
}
export const headerOpts = (opt?: HeaderOptsParams) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${opt?.token}`,
});
