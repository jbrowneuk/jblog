import { PostData, PostDataWrapper } from 'src/app/model/post-data';

export interface JournalState {
  posts?: PostDataWrapper;
  currentPost: PostData | null;
  postsLoading: boolean;
}

export const initialJournalState: JournalState = {
  currentPost: null,
  postsLoading: false
};
