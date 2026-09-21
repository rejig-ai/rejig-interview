'use strict';

const { Router } = require('express');
const { authenticate } = require('../middleware/auth.middleware');
const {
  getPosts,
  getPost,
  createPost,
  updateStatus,
} = require('../controllers/posts.controller');

const router = Router();

// All posts routes require a valid JWT
router.use(authenticate);

router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPost);
router.patch('/:id/status', updateStatus);

module.exports = router;
