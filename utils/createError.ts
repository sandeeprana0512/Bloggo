class CustomError extends Error {
    status: number;
  
    constructor(status: number, message: string) {
      super(message);
      this.status = status;
    }
}
  
export const createError = (status: number, message: string): CustomError => {
   return new CustomError(status, message);
};