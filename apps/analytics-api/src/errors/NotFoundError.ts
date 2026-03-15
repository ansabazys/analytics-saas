import { AppError } from "../utils/AppError";

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

// organization not found
// website not found
// user not found
