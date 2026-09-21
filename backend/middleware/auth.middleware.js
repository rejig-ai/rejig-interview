'use strict';

const jwt = require('jsonwebtoken');

const JWT_SECRET = 'rejig-interview-secret-2024';

/**
 * Middleware: verifies the Bearer token in the Authorization header.
 * Sets req.user = decoded JWT payload on success.
 * Returns 401 if the token is missing or invalid.
 */
function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: false,
      message: 'Missing or malformed Authorization header',
      data: null,
    });
  }

  const token = authHeader.slice(7); // strip "Bearer "

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: 'Invalid or expired token',
      data: null,
    });
  }
}

module.exports = { authenticate, JWT_SECRET };
