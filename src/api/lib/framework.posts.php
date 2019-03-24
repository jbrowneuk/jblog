<?php

const TABLE_SCOPE = "posts";

// Array indexes
const POST_ID_INDEX = "post_id";
const POST_TITLE_INDEX = "title";
const POST_CONTENT_INDEX = "content";
const POST_DATE_INDEX = "post_date";
const POST_STATUS_INDEX = "status";
const POST_SLUG_INDEX = "slug";
const POST_TAG_INDEX = "tag";
const POST_MODIFICATIONDATE_INDEX = "modification_date";
const POST_COMMENT_STATUS_INDEX = "comment_status";
const POST_COMMENT_COUNT_INDEX = "comment_count";

const POST_COUNT_INDEX = "pcount";

class Post
{
  private $id = -1;
  private $slug = '';
  private $title = '';
  private $content = '';
  private $date = 0;
  private $status = 'draft';
  private $tags = array();
  private $commentStatus = 'open';
  private $commentCount = 0;
  private $modifedDate = 0;

  public function __construct($values = null)
  {
    $this->initializeFrom($values);
  }

  public function initializeFrom($values)
  {
    if (!is_array($values) || count($values) == 0)
    {
      return;
    }

    $this->id =       $this->valueForKeyOrDefault($values, POST_ID_INDEX);
    $this->title =    $this->valueForKeyOrDefault($values, POST_TITLE_INDEX);
    $this->content =  $this->valueForKeyOrDefault($values, POST_CONTENT_INDEX);
    $this->date =     $this->valueForKeyOrDefault($values, POST_DATE_INDEX);
    $this->status =   $this->valueForKeyOrDefault($values, POST_STATUS_INDEX);
    $this->slug =     $this->valueForKeyOrDefault($values, POST_SLUG_INDEX, $this->id);

    $this->modifedDate =    $this->valueForKeyOrDefault($values, POST_MODIFICATIONDATE_INDEX);
    $this->commentStatus =  $this->valueForKeyOrDefault($values, POST_COMMENT_STATUS_INDEX);
    $this->commentCount =   $this->valueForKeyOrDefault($values, POST_COMMENT_COUNT_INDEX);

    $tags = $this->valueForKeyOrDefault($values, POST_TAG_INDEX);
    if (StringExtensions::isEmpty($tags))
    {
      $this->tags = array();
    }
    else
    {
      $this->tags = explode(' ', $tags);
    }
  }

  public function getId()
  {
    return $this->id;
  }

  public function getSlug()
  {
    return $this->slug;
  }

  public function getTitle()
  {
    return $this->title;
  }

  public function getContent()
  {
    return $this->content;
  }

  public function getDate()
  {
    return $this->date;
  }

  public function getModifiedDate()
  {
    return $this->modifedDate;
  }

  public function getStatus()
  {
    return $this->status;
  }

  public function getTags()
  {
    return $this->tags;
  }

  public function getCommentStatus()
  {
    $isOpen = strtolower($this->commentStatus) == 'open';
    return $isOpen ? 'open' : 'closed';
  }

  public function getCommentCount()
  {
    return $this->commentCount;
  }

  public function isModified()
  {
    return $this->date < $this->modifedDate;
  }

  /*
   * This is a convenience method that helps prevent PHP warnings if the post
   * object is constructed with an array which doesn't contain post information.
   */
  private function valueForKeyOrDefault($array, $key, $default = "") {
    if (array_key_exists($key, $array)) {
      return $array[$key];
    }

    return $default;
  }
}

class PostList extends ArrayObject
{
  private $database = null;

  public static function getTotalPostCount($database = null, $tag = "", $searchTerms = null)
  {
    if ($database == null)
    {
      throw new Exception("Invalid values passed to static function.");
    }

    $database->setTableScope(TABLE_SCOPE);
    $where = array();
    if (!StringExtensions::isEmpty($tag))
    {
      $where[POST_TAG_INDEX] = "%$tag%";
    }

    if (is_array($searchTerms))
    {
      $separator = "%";
      $where[POST_CONTENT_INDEX] = $separator . implode($separator, $searchTerms) . $separator;
    }

    $field = "COUNT(*) AS " . POST_COUNT_INDEX;
    $results = $database->getWhere($field, $where);
    if (count($results) > 0)
    {
      return $results[0][POST_COUNT_INDEX];
    }

    return 0;
  }

  public static function getPostCountWhereIdLessThan($database, $id, $tag = "")
  {
    if ($database == null)
    {
      throw new Exception("Invalid values passed to static function.");
    }

    $database->setTableScope(TABLE_SCOPE);
    $where = array(POST_ID_INDEX => "< $id");
    if (!StringExtensions::isEmpty($tag))
    {
      $where[POST_TAG_INDEX] = "%$tag%";
    }

    $field = "COUNT(*) AS " . POST_COUNT_INDEX;
    $results = $database->getWhere($field, $where);
    if (count($results) > 0)
    {
      return $results[0][POST_COUNT_INDEX];
    }

    return 0;
  }

  public static function getPostIdForSlug($database, $slug)
  {
    if ($database == null)
    {
      throw new Exception("Invalid values passed to static function.");
    }

    $database->setTableScope(TABLE_SCOPE);
    $where = array(POST_SLUG_INDEX => $slug);
    $field = POST_ID_INDEX;
    $results = $database->getWhere($field, $where);
    if (count($results) > 0)
    {
      return $results[0][POST_ID_INDEX];
    }

    return -1;
  }

  public function __construct($database = null, $amount = 0, $pageOffset = 0, $tag = "", $searchTerms = null)
  {
    if ($database == null || $amount <= 0)
    {
      throw new Exception("Invalid values passed to constructor.");
    }

    $this->database = $database;
    $this->database->setTableScope(TABLE_SCOPE);

    $where = array();
    $options = array();

    if (!StringExtensions::isEmpty($tag))
    {
      $where[POST_TAG_INDEX] = "%$tag%";
    }

    if (is_array($searchTerms))
    {
      $separator = "%";
      $where[POST_CONTENT_INDEX] = $separator . implode($separator, $searchTerms) . $separator;
    }

    if ($amount > 1)
    {
      $offset = $pageOffset * $amount;
      $options = array(
        'ORDER BY' => '`' . POST_DATE_INDEX . '` DESC',
        'LIMIT' => "$offset, $amount"
      );
    }
    else
    {
      $where[POST_ID_INDEX] = $pageOffset;
    }

    $resultSet = $this->database->getWhere("ALL", $where, $options);
    foreach ($resultSet as $result)
    {
      self::append(new Post($result));
    }
  }
}
