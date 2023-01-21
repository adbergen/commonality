export default interface ApiError {
  response: {
    data: {
      error: {
        message: string;
      };
    };
  };
}
