import { AppError } from "../utils/AppError";

export class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

//invalid request data
//missing fields
//invalid params
