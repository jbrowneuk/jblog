<?php

class GalleryImage
{
  private $id;
  private $description;
  private $galleries;
  private $imageFile;
  private $title;
  private $date;

  public function __construct($dbRow)
  {
    $this->id =           $dbRow["image_id"];
    $this->description =  $dbRow["description"];
    $this->galleries =    $dbRow["galleries"];
    $this->imageFile =    $dbRow["file"];
    $this->title =        $dbRow["title"];
    $this->date =         $dbRow["image_date"];
  }

  public function getId()
  {
    return $this->id;
  }

  public function getTitle()
  {
    return $this->title;
  }

  public function getImageUri()
  {
    return $this->imageFile;
  }

  public function getDate()
  {
    return $this->date;
  }

  public function getDescription()
  {
    return $this->description;
  }

  public function getGalleries()
  {
    return $this->galleries;
  }
}

class GalleryAlbum
{
	private $id;
	private $title;
	private $name;
	private $description;

	public function __construct($dbRow)
	{
		$this->id     = $dbRow["album_id"];
		$this->title  = $dbRow["title"];
		$this->name   = $dbRow["name"];
		$this->description = $dbRow["description"];
	}

	public function getId()
	{
		return $this->id;
	}

	public function getTitle()
	{
		return $this->title;
	}

	public function getName()
	{
		return $this->name;
	}

	public function getDescription()
	{
		return $this->description;
	}
}

class GalleryAlbumList extends ArrayObject
{
  private $database = null;

  public static function getAlbumById($database, $albumId)
  {
    $database->setTableScope('albums');
    $where = array('album_id' => $albumId);
    $options = array('LIMIT' => 1);
    $resultSet = $database->getWhere("ALL", $where, $options);
    if (count($resultSet) == 0)
    {
      return null;
    }

    return new GalleryAlbum($resultSet[0]);
  }

  public static function getAlbumByName($database, $albumName)
  {
    $database->setTableScope('albums');
    $where = array('name' => $albumName);
    $options = array('LIMIT' => 1);
    $resultSet = $database->getWhere("ALL", $where, $options);
    if (count($resultSet) == 0)
    {
      return null;
    }

    return new GalleryAlbum($resultSet[0]);
  }

  public static function getTotalImagesInAlbum($database, $albumId = 0)
  {
    $database->setTableScope('gallery');
    $field = "COUNT(*) AS image_count";
    $where = array();
    if ($albumId > 0)
    {
      $where['galleries'] = "%$albumId%";
    }

    $resultSet = $database->getWhere($field, $where);
    if (count($resultSet) > 0)
    {
      return $resultSet[0]['image_count'];
    }

    return 0;
  }

  public function __construct($database)
  {
    if ($database == null)
    {
      throw new Exception("Invalid values passed to constructor.");
    }

    $this->database = $database;
    $this->database->setTableScope('albums');

    $resultSet = $this->database->getAllFields();
    foreach ($resultSet as $result)
    {
      self::append(new GalleryAlbum($result));
    }
  }
}

class GalleryImageList extends ArrayObject
{
  private $database = null;
  private $requestedGallery = 0;

  public static function getImageById($database, $imageId)
  {
    $database->setTableScope('gallery');
    $where = array('image_id' => $imageId);
    $options = array('LIMIT' => 1);
    $resultSet = $database->getWhere("ALL", $where, $options);
    if (count($resultSet) == 0)
    {
      return null;
    }

    return new GalleryImage($resultSet[0]);
  }

  public function __construct($database = null, $amount = 0, $pageOffset = 0, $gallery = 0)
  {
    if ($database == null || $amount <= 0)
    {
      throw new Exception("Invalid values passed to constructor.");
    }

    $this->database = $database;
    $this->database->setTableScope('gallery');
    $this->requestedGallery = $gallery;

    $where = array();
    $options = array();

    if ($this->requestedGallery > 0)
    {
      $where['galleries'] = '%' . $this->requestedGallery . '%';
    }

    if ($amount > 1)
    {
      $offset = $pageOffset * $amount;
      $options = array(
        'ORDER BY' => 'datetime(`image_date`) DESC',
        'LIMIT' => "$offset,$amount"
      );
    }
    else
    {
      $where['image_id'] = $pageOffset;
    }

    $resultSet = $this->database->getWhere("ALL", $where, $options);
    foreach ($resultSet as $result)
    {
      self::append(new GalleryImage($result));
    }
  }
}
