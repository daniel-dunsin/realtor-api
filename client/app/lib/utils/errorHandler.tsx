export const errorHandler = (error: any) => {
  return error.response.data.error;
};
