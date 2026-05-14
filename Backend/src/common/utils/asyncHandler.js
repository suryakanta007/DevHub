/**
 * Wraps an async controller/middleware so errors are forwarded to the global error handler.
 * No try/catch needed in controllers.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
