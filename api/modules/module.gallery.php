<?php

const FEATURED_FOLDER_ID = 1;
const LATEST_ALBUM_ID = 0;
const LATEST_ALBUM_NAME = "latest";
const IMAGES_PER_PAGE = 16;
const GALLERY_ROOT = "http://jbrowne.me.uk/art/";
const THUMBNAIL_URL = GALLERY_ROOT . "thumbs/";
const IMAGE_URL = GALLERY_ROOT . "images/";
const ICON_URL = GALLERY_ROOT . "icons/";

const DEFAULT_ALBUM_NAME_QUERY = "_default";

// Relative to the file that includes this one
require "lib/framework.gallery.php";

class ApiModule {

  private $db = NULL;
  private $galleryAlbumCache = null;

  //============================================================================
  // Constructor.
  //============================================================================
  public function __construct($db) {
    $this->db = $db;

    $this->galleryAlbumCache = new GalleryAlbumList($this->db);
  }

  //============================================================================
  // Main entry point.
  //============================================================================
  public function handleResponse() {
    if (isset($_GET["images"])) {
      $this->generateAlbumComponentImageData();
      return;
    }

    if (isset($_GET["albumData"])) {
      if (isset($_GET["fullList"])) {
        // $this->generateAlbumListAlbumData();
        return;
      }

      $this->generateAlbumComponentAlbumData();
      return;
    }

    if (isset($_GET["imageData"])) {
      $this->generateImageComponentData();
      return;
    }

    ResponseHelpers::respondNotFound();
  }

  //============================================================================
  // Generates the data containing information about a specified image.
  //============================================================================
  private function generateImageComponentData() {
    $requestedImage = RequestHelpers::getNumericValue("imageId", -1);
    if ($requestedImage < 1) {
      ResponseHelpers::respondNotFound();
      return;
    }

    $image = GalleryImageList::getImageById($this->db, $requestedImage);
    if ($image === NULL) {
      ResponseHelpers::respondNotFound();
      return;
    }

    $imageData = $this->generateImageInfo($image);
    ResponseHelpers::outputWithJsonHeader($imageData);
  }

  //============================================================================
  // Generates the data containing all the images in a specified album.
  //============================================================================
  private function generateAlbumComponentImageData() {
    $page = RequestHelpers::getNumericValue("page", 1);
    $requestedPage = $page - 1;
    if ($requestedPage < 0) {
      $requestedPage = 0;
    }

    $requestedName = RequestHelpers::getRawValue("albumName");
    if (is_null($requestedName)) {
      ResponseHelpers::respondNotFound();
      return;
    }

    $numberImagesToLoad = RequestHelpers::getNumericValue("count", IMAGES_PER_PAGE);
    if ($numberImagesToLoad <= 0) {
      $numberImagesToLoad = IMAGES_PER_PAGE;
    }

    $requestedAlbumId = LATEST_ALBUM_ID;
    if ($requestedName !== LATEST_ALBUM_NAME && $requestedName !== DEFAULT_ALBUM_NAME_QUERY) {
      // Look up album - returns null if it doesn't exist.
      $currentAlbum = GalleryAlbumList::getAlbumByName($this->db, $requestedName);
      if ($currentAlbum === NULL) {
        respondNotFound();
        return;
      }

      $requestedAlbumId = $currentAlbum->getId();
    }

    $galleryImages = new GalleryImageList($this->db, $numberImagesToLoad, $requestedPage, $requestedAlbumId);
    $output = array();

    foreach ($galleryImages as $image) {
      $output[] = $this->generateImageInfo($image);
    }

    ResponseHelpers::outputWithJsonHeader($output);
  }

  //
  // Creates a JSON-serializable key-value pair encompassing the album name & title.
  //
  private function generateAlbumNameTitlePair($album) {
    return array(
      "name"  => $album->getName(),
      "title" =>$album->getTitle()
    );
  }

  //
  // Creates a JSON-serializable key-value pair encompassing an album image
  //
  private function generateImageInfo($image) {
    $isFeatured = false;
    $containingGalleries = array();

    $galleryIds = explode(' ', $image->getGalleries());
    foreach ($galleryIds as $key => $galleryId) {
      if ($galleryId == FEATURED_FOLDER_ID) {
        $isFeatured = true;
        continue;
      }

      $albumsFromCache = array_filter((array)$this->galleryAlbumCache, function($e) use ($galleryId) { return $e->getId() == $galleryId; });
      if (count($albumsFromCache) > 0) {
        $firstMatch = array_values($albumsFromCache)[0];
        $containingGalleries[] = $this->generateAlbumNameTitlePair($firstMatch);
      }
    }

    // Sanity check - add featured if no containing galleries but it is featured
    if ($isFeatured && count($containingGalleries) === 0) {
      $albumsFromCache = array_filter((array)$this->galleryAlbumCache, function($e) { return $e->getId() == FEATURED_FOLDER_ID; });
      $firstMatch = array_values($albumsFromCache)[0];
      $containingGalleries[] = $this->generateAlbumNameTitlePair($firstMatch);
    }

    return array(
      "id"                => $image->getId(),
      "title"             => $image->getTitle(),
      "date"              => $image->getDate(),
      "description"       => $image->getDescription(),
      "thumbnail"         => THUMBNAIL_URL . $image->getImageUri(),
      "src"               => IMAGE_URL . $image->getImageUri(),
      "containingAlbums"  => $containingGalleries,
      "featured"          => $isFeatured
    );
  }

  //============================================================================
  // Generates the data corresponding to a single album's information.
  //============================================================================
  private function generateAlbumComponentAlbumData() {
    $requestedAlbumName = RequestHelpers::getRawValue("albumName");
    if (is_null($requestedAlbumName)) {
      ResponseHelpers::respondNotFound();
      return;
    }

    $album = NULL;
    if ($requestedAlbumName != LATEST_ALBUM_NAME && $requestedAlbumName != DEFAULT_ALBUM_NAME_QUERY) {
      $album = GalleryAlbumList::getAlbumByName($this->db, $requestedAlbumName);
    } else {
      // TODO: get from settings or something.
      $latestAlbumInfo = array(
        "id"          => LATEST_ALBUM_ID,
        "title"       => "Latest works",
        "name"        => LATEST_ALBUM_NAME,
        "description" => "This album shows all images I have uploaded, latest first."
      );
      $album = new GalleryAlbum($latestAlbumInfo);
    }

    if ($album === NULL) {
      respondNotFound();
      return;
    }

    $output = $this->generateAlbumInfo($album);
    ResponseHelpers::outputWithJsonHeader($output);
  }

  //
  // Creates a JSON-serializable key-value pair encompassing an album.
  //
  private function generateAlbumInfo($album) {
    $totalImages = GalleryAlbumList::getTotalImagesInAlbum($this->db, $album->getId());
    $totalPages = ceil($totalImages / IMAGES_PER_PAGE);

    return array(
      "albumId"       => $album->getId(),
      "title"         => $album->getTitle(),
      "name"          => $album->getName(),
      "description"   => $album->getDescription(),
      "imagesInAlbum" => $totalImages,
      "imagesPerPage" => IMAGES_PER_PAGE,
      "totalPages"    => $totalPages,
      "iconUrl"       => ICON_URL . $album->getName() . ".jpg"
    );
  }
}

/*

//==============================================================================
// Generates JSON data containing a list of all relevant album data.
//==============================================================================
function generateAllAlbumsInfoView($database) {
  $albumsJson = "";
  $galleryAlbumCache = new GalleryAlbumList($database);
  foreach ($galleryAlbumCache as $cachedAlbum) {
    if (strlen($albumsJson) > 0) {
      $albumsJson .= ", ";
    }

    $albumId = $cachedAlbum->getId();
    $title = StringExtensions::cleanText($cachedAlbum->getTitle());
    $name = StringExtensions::cleanText($cachedAlbum->getName());
    $description = StringExtensions::cleanText($cachedAlbum->getDescription());
    $imagesPerPage = IMAGES_PER_PAGE;
    $totalImages = GalleryAlbumList::getTotalImagesInAlbum($database, $albumId);
    $totalPages = ceil($totalImages / $imagesPerPage);
    $iconUrl = ICON_URL . $name . ".jpg";

    $albumsJson .= <<<EOF
{
  "albumId": {$albumId},
  "title": "{$title}",
  "name": "{$name}",
  "description": "{$description}",
  "imagesInAlbum": {$totalImages},
  "imagesPerPage": {$imagesPerPage},
  "totalPages": {$totalPages},
  "iconUrl": "{$iconUrl}"
}
EOF;
  }

  $jsonString = <<<EOF
{
  "data": [{$albumsJson}]
}
EOF;
  outputWithHeader($jsonString);
}

*/
