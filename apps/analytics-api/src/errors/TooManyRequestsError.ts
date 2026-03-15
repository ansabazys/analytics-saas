import { AppError } from "../utils/AppError";

export class TooManyRequestsError extends AppError {
  constructor(message = "Too many requests") {
    super(message, 429);
  }
}

// API rate limit exceeded
// abuse protection
