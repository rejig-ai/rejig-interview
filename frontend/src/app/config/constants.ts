export const CONSTANTS = {
  API: {
    BASE_URL: '/api',
    ROUTES: {
      AUTH: {
        LOGIN: '/auth/login'
      },
      POSTS: {
        LIST: '/posts',
        DETAIL: '/posts',        // used as /posts/:id
        CREATE: '/posts',
        UPDATE_STATUS: '/posts'  // used as /posts/:id/status
      }
    }
  }
};
