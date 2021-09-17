export const logMiddleware = async (req, res, next) => {
  const label = `callEndpoint - ${req.originalUrl} - ${req.method}`;
  console.time(label);
  await next();
  console.timeEnd(label);
};
