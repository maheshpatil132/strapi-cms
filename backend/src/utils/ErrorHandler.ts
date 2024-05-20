class ErrorHandler extends Error {
    status: number;
    constructor(status: number, message: string, stack?: string) {
      super(message);
      (this.message = message), (this.status = status);
  
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  export const ApiError = (status: number, message: string) => {
    return new ErrorHandler(status, message);
  };