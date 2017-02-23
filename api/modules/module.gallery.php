<?php

const FEATURED_FOLDER_ID = 1;
const LATEST_ALBUM_ID = 0;
const LATEST_ALBUM_NAME = "latest";
const IMAGES_PER_PAGE = 16;
const GALLERY_ROOT = "/art/";
const THUMBNAIL_URL = GALLERY_ROOT . "thumbs/";
const IMAGE_URL = GALLERY_ROOT . "images/";
const ICON_URL = GALLERY_ROOT . "icons/";

const DEFAULT_ALBUM_NAME_QUERY = "_default";

// Relative to the file that includes this one
require "lib/framework.gallery.php";

class ApiModule {

  private $db = NULL;
  private $galleryAlbumCache = null;

  public function __construct($db) {
    $this->db = $db;

    $this->galleryAlbumCache = new GalleryAlbumList($this->db);
  }

  public function handleResponse() {
    if (isset($_GET["images"])) {
      $this->generateAlbumComponentImageData();
      return;
    }

    if (isset($_GET["albumdata"])) {
      if (isset($_GET["fullList"])) {
        // $this->generateAlbumListAlbumData();
        return;
      }

      // $this->generateAlbumComponentAlbumData();
      return;
    }

    if (isset($_GET["imagedata"])) {
      // $this->generateImageComponentData();
      return;
    }

    ResponseHelpers::respondNotFound();
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

  //============================================================================
  // Generates the album name & title key value pair.
  //============================================================================
  private function generateAlbumNameTitlePair($album) {
    return array(
      "name"  => $album->getName,
      "title" => StringExtensions::cleanText($album->getTitle())
    );
  }

  //============================================================================
  // Generates the data containing information about a specified image.
  //============================================================================
  private function generateImageInfo($image) {
    $isFeatured = false;
    $containingGalleries = array();

    $galleryIds = explode(' ', $image->getGalleries());
    foreach ($galleryIds as $key => $galleryId) {
      if ($galleryId === FEATURED_FOLDER_ID) {
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
      $albumsFromCache = array_filter((array)$this->galleryAlbumCache, function($e) { return $e->getId() === FEATURED_FOLDER_ID; });
      $firstMatch = array_values($albumsFromCache)[0];
      $containingGalleries[] = $this->generateAlbumNameTitlePair($firstMatch);
    }

    return array(
      "id"                => $image->getId(),
      "title"             => StringExtensions::cleanText($image->getTitle()),
      "date"              => $image->getDate(),
      "description"       => StringExtensions::cleanText($image->getDescription()),
      "thumbnail"         => THUMBNAIL_URL . $image->getImageUri(),
      "src"               => IMAGE_URL . $image->getImageUri(),
      "containingAlbums"  => $containingGalleries,
      "featured"          => $isFeatured
    );
  }
}

/*


function generateFolderView($database) {


  foreach ($galleryImages as $image) {
    if (strlen($output) > 0) {
      $output .= ", ";
    }

    $containingGalleries = "";
    $galleryNumbers = explode(' ', $image->getGalleries());
    foreach ($galleryNumbers as $id => $albumId) {
      if (strlen($containingGalleries) > 0) {
        $containingGalleries .= ", ";
      }

      $albumsFromCache = array_filter((array)$galleryAlbumCache, function($e) use ($albumId) { return $e->getId() == $albumId; });
      if (count($albumsFromCache) > 0)
      {
        $first = array_values($albumsFromCache)[0];
        $containingGalleries .= '"' . $first->getTitle() . '"';
      }
    }
  }
}

//==============================================================================
// Generates the JSON data corresponding to a single album's information.
//==============================================================================
function generateSingleAlbumInfoView($database) {
  $albumNameQuery = "albumName";
  if (!isset($_GET[$albumNameQuery])) {
    respondNotFound();
    return;
  }

  $title = "Latest works";
  $name = LATEST_ALBUM_NAME;
  $description = "The gallery is being rewritten from scratch, and is lacking a lot of features currently. This page shows all images I have uploaded, latest first.";
  $requestedAlbumId = LATEST_ALBUM_ID;

  $requestedName = $_GET[$albumNameQuery];
  if ($requestedName === LATEST_ALBUM_NAME || $requestedName === DEFAULT_ALBUM_NAME_QUERY) {
    $requestedAlbumId = LATEST_ALBUM_ID;
  } else {
    $albumLookup = GalleryAlbumList::getAlbumByName($database, $requestedName);
    if ($albumLookup === NULL) {
      respondNotFound();
      return;
    }

    $requestedAlbumId = $albumLookup->getId();
  }

  // Album 0 is a special case - it's the "latest uploads" album
  if ($requestedAlbumId > 0) {
    $currentAlbum = GalleryAlbumList::getAlbumById($database, $requestedAlbumId);
    if ($currentAlbum === NULL) {
      respondNotFound();
      return;
    }

    $title = StringExtensions::cleanText($currentAlbum->getTitle());
    $name = StringExtensions::cleanText($currentAlbum->getName());
    $description = StringExtensions::cleanText($currentAlbum->getDescription());
  }

  $imagesPerPage = IMAGES_PER_PAGE;
  $totalImages = GalleryAlbumList::getTotalImagesInAlbum($database, $requestedAlbumId);
  $totalPages = ceil($totalImages / $imagesPerPage);
  $iconUrl = ICON_URL . $name . ".jpg";

  $jsonString = <<<EOF
{
  "data": {
    "albumId": {$requestedAlbumId},
    "title": "{$title}",
    "name": "{$name}",
    "description": "{$description}",
    "imagesInAlbum": {$totalImages},
    "imagesPerPage": {$imagesPerPage},
    "totalPages": {$totalPages},
    "iconUrl": "{$iconUrl}"
  }
}
EOF;
  outputWithHeader($jsonString);
}

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

//==============================================================================
// Generates the JSON data containing information about a specified image.
//==============================================================================
function generateImageView($database) {
  $queryId = "imageId";
  $requestedImage = isset($_GET[$queryId]) && is_numeric($_GET[$queryId]) ? (int)$_GET[$queryId] : -1;
  if ($requestedImage < 1) {
    returnNotFound();
    return;
  }

  $image = GalleryImageList::getImageById($database, $requestedImage);
  if ($image == null) {
    respondNotFound();
    return;
  }

  $safeTitle = StringExtensions::cleanText($image->getTitle());
  $safeDescription = StringExtensions::cleanText($image->getDescription());
  $url = IMAGE_URL . $image->getImageUri();

  $galleryAlbumCache = new GalleryAlbumList($database);

 ///// moved

  $isFeaturedString = $isFeatured ? "true" : "false";
  $jsonString = <<<EOF
{
  "data": {
    "title": "{$safeTitle}",
    "date": {$image->getDate()},
    "description": "{$safeDescription}",
    "url": "{$url}",
    "containingAlbums": [{$containingGalleries}],
    "featured": {$isFeaturedString}
  }
}
EOF;
  outputWithHeader($jsonString);
}

*/
