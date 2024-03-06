/**
 * An interface which can be used by a class to encapsulate a Project.
 */
export interface Project {
  /** GitHub repository name */
  name: string;

  /** GitHub repository description */
  description: string;

  /** Primary programming language */
  language: string;

  /** License name */
  license: string;

  /** URL to GitHub repository */
  link: string;

  /** Whether the repository is archived */
  archived: boolean;

  /** Number of stars on the GitHub repository */
  stars: number;

  /** Number of watchers on the GitHub repository */
  watchers: number;

  /** Number of forks of the GitHub repository */
  forks: number;

  /** Number of open issues */
  issues: number;

  /** Last updated timestamp */
  lastUpdated: Date;
}
