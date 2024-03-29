/**
 * An enumeration covering the statuses a post can have
 */
export enum PostStatus {
  /** Published */
  Publish = 'publish',

  /** Unpublished draft */
  Draft = 'draft'
}

/**
 * An interface which can be used by a class to encapsulate a journal post.
 */
export interface PostData {
  /**
   * The post's unique identifier.
   */
  postId: number;

  /**
   * The post's date, represented as a timestamp.
   */
  date: number;

  /**
   * The post's modification date, represented as a timestamp.
   * Null if not modified.
   */
  modified: number | null;

  /**
   * The post title
   */
  title: string;

  /**
   * The post's content
   */
  content: string;

  /**
   * Tags associated with the post
   */
  tags: string[];

  /**
   * Post slug
   */
  slug: string;

  /**
   * Post status
   */
  status: PostStatus;
}

/**
 * An interface which can be used by a class to encapsulate a collection of
 * journal posts, and the pagination details.
 */
export interface PostDataWrapper {
  /**
   * The collection of posts
   */
  posts: PostData[];

  /**
   * The currently displayed page for the settings defined in the API request
   */
  page: number;

  /**
   * The total number of pages with the settings defined in the API request
   */
  totalPages: number;
}
