<?php

require "lib/framework.posts.php";

const POST_ID_QUERY = "postId";

class ApiModule {

  private $db = NULL;

  //============================================================================
  // Constructor.
  //============================================================================
  public function __construct($db) {
    $this->db = $db;
  }

  //============================================================================
  // Main entry point.
  //============================================================================
  public function handleResponse() {
    if (isset($_GET[POST_ID_QUERY])) {
      $this->getSinglePost();
      return;
    }

    $this->getPostList();
  }

  //============================================================================
  // Generates the data containing information about a single post.
  //============================================================================
  private function getSinglePost() {
    $postId = RequestHelpers::getNumericValue(POST_ID_QUERY, -1);
    if ($postId <= 0) {
      ResponseHelpers::respondNotFound();
      return;
    }

    $posts = new PostList($this->db, 1, $postId, "", "");

    // Sanity check - post has to exist AND there should only be one with this ID
    if (count($posts) !== 1) {
      ResponseHelpers::respondNotFound();
      return;
    }

    $output = $this->generatePostsOutput($posts);
    ResponseHelpers::outputWithJsonHeader($output);
  }

  //
  // Creates a JSON-serializable key-value pair encompassing the post data.
  //
  private function generatePostsOutput($posts) {
    $output = array();
    foreach ($posts as $post) {
      $output[] = array(
        "postId"  => $post->getId(),
        "date"    => $post->getDate(),
        "title"   => $post->getTitle(),
        "content" => $post->getContent(),
        "tags"    => $post->getTags()
      );
    }

    return $output;
  }

  //============================================================================
  // Generates the data containing information about a set of posts.
  //============================================================================
  private function getPostList() {
    global $settings;

    $page = RequestHelpers::getNumericValue("page", 1);
    $offset = $page - 1;
    if ($offset < 0) {
      $offset = 0;
    }

    $tag = RequestHelpers::getRawValue("tag");
    $searchTerms = RequestHelpers::getRawValue("search");

    $posts = new PostList($this->db, $settings["Defaults"]["PostsVisible"], $offset, $tag, $searchTerms);
    $postCount = PostList::getTotalPostCount($this->db, $tag, $searchTerms);
    $totalPages = ceil($postCount / $settings["Defaults"]["PostsVisible"]);

    $output = array(
      "posts" => $this->generatePostsOutput($posts),
      "totalPages" => $totalPages
    );
    ResponseHelpers::outputWithJsonHeader($output);
  }

}
