"use strict";

const {
  getPostsByDomain,
  getPostById,
  createPost,
  updatePostStatus,
} = require("../data/store");

// ---------------------------------------------------------------------------
// GET /posts
// ---------------------------------------------------------------------------
function getPosts(req, res) {
  const domain_id = req.query.domain_id || req.user.domain_id;

  const page = parseInt(req.query.page) || 1;
  const limit = 10;

  const skip = (page - 1) * limit;

  const status = req.query.status || "";

  const { posts, total } = getPostsByDomain(domain_id, { skip, limit, status });

  return res.status(200).json({
    status: true,
    message: "OK",
    data: { posts, total, page, limit },
  });
}

// ---------------------------------------------------------------------------
// GET /posts/:id
// ---------------------------------------------------------------------------
function getPost(req, res) {
  const { id } = req.params;
  const post = getPostById(id);

  if (!post) {
    return res.status(404).json({
      status: false,
      message: "Post not found",
      data: null,
    });
  }

  return res.status(200).json({
    status: true,
    message: "OK",
    data: post,
  });
}

// ---------------------------------------------------------------------------
// POST /posts
// ---------------------------------------------------------------------------
function createPostHandler(req, res) {
  const { title, caption, platform, scheduled_date } = req.body || {};

  if (!title || !caption || !platform) {
    return res.status(400).json({
      status: false,
      message: "title, caption, and platform are required",
      data: null,
    });
  }

  const post = createPost({
    title,
    caption,
    platform,
    scheduled_date: scheduled_date || null,
    status: "draft",
    domain_id: req.user.domain_id,
    created_by: req.user._id,
  });

  return res.status(201).json({
    status: true,
    message: "POST_CREATED",
    data: post,
  });
}

// ---------------------------------------------------------------------------
// PATCH /posts/:id/status
// ---------------------------------------------------------------------------
function updateStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body || {};

  if (!status || !["draft", "published"].includes(status)) {
    return res.status(400).json({
      status: false,
      message: 'status must be "draft" or "published"',
      data: null,
    });
  }

  const post = updatePostStatus(id, status);

  if (!post) {
    return res.status(404).json({
      status: false,
      message: "Post not found",
      data: null,
    });
  }

  return res.status(200).json({
    status: true,
    message: "STATUS_UPDATED",
    data: post,
  });
}

module.exports = {
  getPosts,
  getPost,
  createPost: createPostHandler,
  updateStatus,
};
