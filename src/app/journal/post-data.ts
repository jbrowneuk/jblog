export interface PostData {
  postId: number;
  date: number;
  title: string;
  content: string;
  tags: string[];
}

export interface PostDataWrapper {
  posts: PostData[];
  totalPages: number;
}
