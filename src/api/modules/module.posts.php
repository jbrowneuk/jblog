<?php

require "lib/framework.posts.php";

const POST_SLUG_QUERY = "slug";

class ApiModule {

  private $db;
  private $settings;

  //============================================================================
  // Constructor.
  //============================================================================
  public function __construct($db, $settings) {
    $this->db = $db;
    $this->settings = $settings;
  }

  //============================================================================
  // Main entry point.
  //============================================================================
  public function handleResponse() {
    if (isset($_GET[POST_SLUG_QUERY])) {
      $this->getSinglePost();
      return;
    }

    $this->getPostList();
  }

  //============================================================================
  // Generates the data containing information about a single post.
  //============================================================================
  private function getSinglePost() {
    $postSlug = RequestHelpers::getRawValue(POST_SLUG_QUERY, "");
    if ($postSlug == "") {
      ResponseHelpers::respondNotFound();
      return;
    }

    $postId = PostList::getPostIdForSlug($this->db, $postSlug);
    if ($postId < 1)
    {
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

  //============================================================================
  // Creates a JSON-serializable key-value pair encompassing the post data.
  //============================================================================
  private function generatePostsOutput($posts) {
    $output = array();
    foreach ($posts as $post) {
      $output[] = array(
        "postId"   => $post->getId(),
        "date"     => $post->getDate(),
        "modified" => $post->getModifiedDate(),
        "title"    => $post->getTitle(),
        "content"  => $post->getContent(),
        "tags"     => $post->getTags(),
        "slug"     => $post->getSlug()
      );
    }

    return $output;
  }

  //============================================================================
  // Generates the data containing information about a set of posts.
  //============================================================================
  private function getPostList() {
    $page = RequestHelpers::getNumericValue("page", 1);
    $offset = $page - 1;
    if ($offset < 0) {
      $offset = 0;
    }

    $tag = RequestHelpers::getRawValue("tag");
    $searchTerms = RequestHelpers::getRawValue("search");

    $posts = new PostList($this->db, $this->settings["Defaults"]["PostsVisible"], $offset, $tag, $searchTerms);
    $postCount = PostList::getTotalPostCount($this->db, $tag, $searchTerms);
    $totalPages = ceil($postCount / $this->settings["Defaults"]["PostsVisible"]);

    $output = array(
      "posts" => $this->generatePostsOutput($posts),
      "page" => $page,
      "totalPages" => $totalPages
    );
    ResponseHelpers::outputWithJsonHeader($output);
  }

}
