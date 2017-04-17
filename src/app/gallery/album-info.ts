/**
 * An interface which can be used by a class to encapsulate album data
 */
export interface AlbumInfo {
  /**
   * The album's unique ID
   */
  albumId: number;

  /**
   * The album title, as displayed to the user
   */
  title: string;

  /**
   * The short album name, used to refer to the album in URLs
   */
  name: string;

  /**
   * The album description
   */
  description: string;

  /**
   * The total number of images in the album
   */
  imagesInAlbum: number;

  /**
   * The number of images on a page
   */
  imagesPerPage: number;

  /**
   * The number of pages that the album has. See also: imagesPerPage
   */
  totalPages: number;

  /**
   * The URL to the album icon
   */
  iconUrl: string;
}
