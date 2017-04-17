/**
 * An interface which can be used by a class to encapsulate a Project.
 */
export interface Project {
  /**
   * The project's unique name
   * @type {string}
   */
  name: string;

  /**
   * The project's descriptive name - presented to the user
   * @type {string}
   */
  title: string;

  /**
   * The project's summary description text
   * @type {string}
   */
  summary: string;

  /**
   * The project's short information - usually the programming language and
   * framework
   * @type {string}
   */
  info: string;

  /**
   * The project's external link - if set, used by the project list to link to
   * a different location; otherwise the project detail component is used
   * @type {string}
   */
  link: string;

  /**
   * The project's resources (i.e. image) base path
   * @type {string}
   */
  resourcesUrl: string;
}
