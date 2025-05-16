const API_KEY = process.env.API_KEY || 'AnyApiKey';
export const apiKeyAuth = (request, res, next) => {
  try {
    if (
      request?.headers &&
      request?.headers['x-api-key'] &&
      request.headers['x-api-key'] === API_KEY
    ) {
      next();
    } else {
      res.status(401).json({ message: 'Not Authorized ' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Auth failed ', detail: error.message });
  }
};
