export class CustomError extends Error {
    constructor(
      public readonly code: string,
      public readonly message: string,
      public readonly status: number,
    ) {
      super(message);
      this.name = "CustomError";
    }
  
    toResponse() {
      const response = {
        code: this.code,
        message: this.message,
      };
  
      return response;
    }
  }