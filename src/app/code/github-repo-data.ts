// Most important properties taken from the GitHub API response. Duplicates
// (i.e. forks_count, forks) are because I don't know which is the correct property
export interface GithubRepoData {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url?: string;
  };
  html_url: string;
  description: string;
  fork: boolean;
  url?: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage?: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  archived: boolean;
  open_issues_count: number;
  license: {
    name: string;
    url?: string;
  };
  topics?: string[];
  forks: number;
  open_issues: number;
  watchers: number;
}
