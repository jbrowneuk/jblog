/**
 * A helper interface to encapsulate a strongly-typed string, string key value
 * pair.
 */
export interface AlbumNameTitlePair {
  /**
   * The album's unique name
   */
  name: string;

  /**
   * The album's title, as displayed to the user
   */
  title: string;
}

/**
 * An interface which can be used by a class to encapsulate an album image.
 */
export interface ImageInfo {
  /**
   * The image's unique ID
   */
  id: number;

  /**
   * The image title, as displayed to the user
   */
  title: string;

  /**
   * The image date, specified as a timestamp.
   */
  date: number;

  /**
   * The image description
   */
  description: string;

  /**
   * The image thumbnail URL
   */
  thumbnail: string;

  /**
   * The full image url
   */
  src: string;

  /**
   * The albums containing this image
   */
  containingAlbums: AlbumNameTitlePair[];

  /**
   * Whether the image is featured
   */
  featured: boolean;
}
