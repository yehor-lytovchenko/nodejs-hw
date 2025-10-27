import { HttpError } from 'http-errors';

export function errorHandler(error, req, res, next) {
  if (error instanceof HttpError) {
    return res.status(error.status).json({
      message: error.message || error.name,
    });
  }
  res.status(500).json({
    message: `${error.message}`,
  });
}
