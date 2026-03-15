import { AppError } from "../utils/AppError";

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}

// duplicate slug
// duplicate website domain
// user already member of organization
