export interface Post {
  _id: string;
  title: string;
  caption: string;
  platform: 'instagram' | 'facebook' | 'linkedin';
  status: 'draft' | 'published';
  domain_id: string;
  created_by: string;
  scheduled_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}
