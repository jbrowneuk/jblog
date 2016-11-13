<?php

class Post
{
  private $id = -1;
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

    $this->id =       $this->valueForKeyOrDefault($values, "post_id");
    $this->title =    $this->valueForKeyOrDefault($values, "title");
    $this->content =  $this->valueForKeyOrDefault($values, "content");
    $this->date =     $this->valueForKeyOrDefault($values, "post_date");
    $this->status =   $this->valueForKeyOrDefault($values, "status");

    $this->modifedDate =    $this->valueForKeyOrDefault($values, "modification_date");
    $this->commentStatus =  $this->valueForKeyOrDefault($values, "comment_status");
    $this->commentCount =   $this->valueForKeyOrDefault($values, "comment_count");

    $tags = $this->valueForKeyOrDefault($values, "tag");
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

    $database->setTableScope('posts');
    $where = array();
    if (!StringExtensions::isEmpty($tag))
    {
      $where['tag'] = "%$tag%";
    }

    if (is_array($searchTerms))
    {
      $separator = "%";
      $where['content'] = $separator . implode($separator, $searchTerms) . $separator;
    }

    $field = "COUNT(*) AS post_count";
    $results = $database->getWhere($field, $where);
    if (count($results) > 0)
    {
      return $results[0]['post_count'];
    }

    return 0;
  }

  public static function getPostCountWhereIdLessThan($database, $id, $tag = "")
  {
    if ($database == null)
    {
      throw new Exception("Invalid values passed to static function.");
    }

    $database->setTableScope('posts');
    $where = array('post_id' => "< $id");
    if (!StringExtensions::isEmpty($tag))
    {
      $where['tag'] = "%$tag%";
    }

    $field = "COUNT(*) AS post_count";
    $results = $database->getWhere($field, $where);
    if (count($results) > 0)
    {
      return $results[0]['post_count'];
    }

    return 0;
  }

  public function __construct($database = null, $amount = 0, $pageOffset = 0, $tag = "", $searchTerms = null)
  {
    if ($database == null || $amount <= 0)
    {
      throw new Exception("Invalid values passed to constructor.");
    }

    $this->database = $database;
    $this->database->setTableScope('posts');

    $where = array();
    $options = array();

    if (!StringExtensions::isEmpty($tag))
    {
      $where['tag'] = "%$tag%";
    }

    if (is_array($searchTerms))
    {
      $separator = "%";
      $where['content'] = $separator . implode($separator, $searchTerms) . $separator;
    }

    if ($amount > 1)
    {
      $offset = $pageOffset * $amount;
      $options = array(
        'ORDER BY' => 'datetime(`post_date`) DESC',
        'LIMIT' => "$offset, $amount"
      );
    }
    else
    {
      $where['post_id'] = $pageOffset;
    }

    $resultSet = $this->database->getWhere("ALL", $where, $options);
    foreach ($resultSet as $result)
    {
      self::append(new Post($result));
    }
  }
}
