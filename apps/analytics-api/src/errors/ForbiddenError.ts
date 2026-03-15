import { AppError } from "../utils/AppError";

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

// user not allowed to access resource
// insufficient permissions
// organization access denied
