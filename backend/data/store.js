'use strict';

// ---------------------------------------------------------------------------
// In-memory data store — no external database required
// ---------------------------------------------------------------------------

const postTitles = [
  '3BR Luxury Home in Maplewood',
  'New Listing: Waterfront Property',
  'Market Update: Spring 2024',
  'Just Sold: Downtown Condo',
  'Open House This Weekend',
  '5-Star Client Review Highlight',
  'Tips for First-Time Buyers',
  'Investment Property Alert',
  'Neighbourhood Spotlight: Oakridge',
  'Mortgage Rate Update',
  'Staging Tips to Sell Faster',
  'New Development Coming Soon',
  'Top 5 Home Upgrades for ROI',
  'Summer Market Trends',
  'Community Event This Weekend',
];

const platforms = ['instagram', 'facebook', 'linkedin'];

const captions = [
  'Stunning 3-bedroom home in the heart of Maplewood — schedule a viewing today!',
  'Wake up to waterfront views every morning. This gem won\'t last long.',
  'Spring market is heating up. Here\'s what buyers and sellers need to know.',
  'Another happy family in their new downtown home. Proud to represent!',
  'Join us Saturday 1-4pm. Refreshments provided. Bring your wish list!',
  '"Riccardo was fantastic — patient, knowledgeable, and got us a great deal." — Sarah M.',
  'Buying your first home? Here are 7 things no one tells you.',
  'Cap rate 6.2% in a growing neighbourhood. Investors, DM me before it\'s gone.',
  'Oakridge is one of the city\'s best-kept secrets. Here\'s why families love it.',
  'Rates shifted again. Here\'s what it means for your purchasing power.',
  'Small changes, big impact. These 5 staging tricks can add thousands to your sale price.',
  'Exciting new development breaking ground next month. Pre-sale opportunities available.',
  'Thinking of renovating? Focus here for the highest return on investment.',
  'Summer listings, buyer demand, and what the data says about the next 90 days.',
  'Come meet your neighbours and enjoy local food trucks — see you there!',
];

// Base timestamp: oldest post is ~15 days ago, newest is yesterday
const now = new Date();

function buildAlicePosts() {
  const posts = [];
  for (let i = 0; i < 15; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - (14 - i)); // oldest first
    const created_at = date.toISOString();
    const updated_at = created_at;

    posts.push({
      _id: `post-${String(i + 1).padStart(3, '0')}`,
      title: postTitles[i],
      caption: captions[i],
      platform: platforms[i % 3],
      status: i % 2 === 0 ? 'published' : 'draft', // even index = published
      domain_id: 'domain-001',
      created_by: 'user-001',
      scheduled_date: null,
      created_at,
      updated_at,
    });
  }
  return posts;
}

function buildBobPosts() {
  const posts = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - (4 - i));
    const created_at = date.toISOString();
    posts.push({
      _id: `post-bob-${String(i + 1).padStart(3, '0')}`,
      title: `Bob's Confidential Listing ${i + 1}`,
      caption: `Confidential listing details for Bob's property ${i + 1}.`,
      platform: 'facebook',
      status: 'draft',
      domain_id: 'domain-002',
      created_by: 'user-002',
      scheduled_date: null,
      created_at,
      updated_at: created_at,
    });
  }
  return posts;
}

const users = [
  {
    _id: 'user-001',
    email: 'alice@rejig.ai',
    password: 'password123',
    name: 'Alice',
    domain_id: 'domain-001',
  },
  {
    _id: 'user-002',
    email: 'bob@rejig.ai',
    password: 'password123',
    name: 'Bob',
    domain_id: 'domain-002',
  },
];

// Mutable in-memory posts array
const posts = [...buildAlicePosts(), ...buildBobPosts()];

// ---------------------------------------------------------------------------
// Store API
// ---------------------------------------------------------------------------

function getUserByEmail(email) {
  return users.find((u) => u.email === email) || null;
}

/**
 * Returns posts for a domain, with optional status filter and pagination.
 * Posts are returned newest-first.
 *
 * @param {string} domain_id
 * @param {{ skip: number, limit: number, status: string }} options
 * @returns {{ posts: object[], total: number }}
 */
function getPostsByDomain(domain_id, { skip = 0, limit = 10, status = '' } = {}) {
  let filtered = posts.filter((p) => p.domain_id === domain_id);

  // Sort newest first so pagination effect of Bug 3 is immediately visible
  filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  if (status) {
    filtered = filtered.filter((p) => p.status === status);
  }

  const total = filtered.length;
  const page_posts = filtered.slice(skip, skip + limit);

  return { posts: page_posts, total };
}

function getPostById(id) {
  return posts.find((p) => p._id === id) || null;
}

function createPost(data) {
  // Use a simple timestamp-based ID when uuid is unavailable in tests
  const { v4: uuidv4 } = require('uuid');
  const now_iso = new Date().toISOString();
  const post = {
    _id: uuidv4(),
    ...data,
    created_at: now_iso,
    updated_at: now_iso,
  };
  posts.push(post);
  return post;
}

function updatePostStatus(id, status) {
  const post = posts.find((p) => p._id === id);
  if (!post) return null;
  post.status = status;
  post.updated_at = new Date().toISOString();
  return post;
}

module.exports = {
  getUserByEmail,
  getPostsByDomain,
  getPostById,
  createPost,
  updatePostStatus,
};
