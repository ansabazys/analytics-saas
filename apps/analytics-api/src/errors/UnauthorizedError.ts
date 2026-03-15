import { AppError } from "../utils/AppError";

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

// missing authentication token
// invalid JWT token
// expired session
