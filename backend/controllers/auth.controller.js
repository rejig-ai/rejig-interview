'use strict';

const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../data/store');
const { JWT_SECRET } = require('../middleware/auth.middleware');

/**
 * POST /auth/login
 * Body: { email, password }
 */
function login(req, res) {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      status: false,
      message: 'email and password are required',
      data: null,
    });
  }

  const user = getUserByEmail(email);

  // Plain-text comparison (no hashing for simplicity in this exercise)
  if (!user || user.password !== password) {
    return res.status(401).json({
      status: false,
      message: 'Invalid credentials',
      data: null,
    });
  }

  const payload = {
    _id: user._id,
    email: user.email,
    name: user.name,
    domain_id: user.domain_id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });

  return res.status(200).json({
    status: true,
    message: 'LOGIN_SUCCESS',
    data: {
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    },
  });
}

module.exports = { login };
