'use strict';

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const postsRoutes = require('./routes/posts.routes');

const app = express();
const PORT = 3000;

// ---------------------------------------------------------------------------
// Global middleware
// ---------------------------------------------------------------------------
app.use(cors());
app.use(express.json());

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Rejig interview backend running on http://localhost:${PORT}`);
  console.log(`  Health:  GET  http://localhost:${PORT}/health`);
  console.log(`  Login:   POST http://localhost:${PORT}/auth/login`);
  console.log(`  Posts:   GET  http://localhost:${PORT}/posts  (requires auth)`);
});
