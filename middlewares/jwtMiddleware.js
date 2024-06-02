const inMemoryStorage = require('../inMemoryStorage');

const jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (token && inMemoryStorage[token]) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = jwtMiddleware;
