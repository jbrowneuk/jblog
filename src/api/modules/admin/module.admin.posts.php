<?php

require "lib/framework.posts.php";

class AdminModule {

  private $db;
  private $settings;
  private $authInfo;

  //============================================================================
  // Constructor.
  //============================================================================
  public function __construct($db, $settings, $authInfo) {
    $this->db = $db;
    $this->settings = $settings;
    $this->authInfo = $authInfo;
  }

  //============================================================================
  // Main entry point.
  //============================================================================
  public function handleResponse() {
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
      return ResponseHelpers::respondNoContent();
    }

    // TODO: refactor to use RequestHelpers
    $rawPostData = json_decode($_POST["data"]);
    if (!isset($rawPostData)) {
      return ResponseHelpers::respondBadRequest();
    }

    $id = $rawPostData->postId;
    if (!isset($id) || $id < 0) {
      // Create post
      $this->createPost($rawPostData);
    } else {
      // Edit post
      print "EDIT AN OLD POST\n\n" . print_r($rawPostData, true);
    }
  }

  private function createPost($postData) {
    $fields = array(
      POST_ID_INDEX => null,
      POST_TITLE_INDEX => $postData->title,
      POST_CONTENT_INDEX => $postData->content,
      POST_DATE_INDEX => time(),
      POST_STATUS_INDEX => $postData->status,
      POST_SLUG_INDEX => $postData->slug,
      POST_TAG_INDEX => implode(' ', $postData->tags),
      POST_MODIFICATIONDATE_INDEX => null,
      POST_COMMENT_STATUS_INDEX => 'open', // todo
      POST_COMMENT_COUNT_INDEX => 0
    );

    $success = $this->db->insert($fields, TABLE_SCOPE);
    if (!$success) {
      // TODO: respond with error JSON and some other type of HTTP code
      print "FAIL" . print_r($this->db->getErrorMessages(), true);
      return ResponseHelpers::respondServerError();
    }

    ResponseHelpers::outputWithPlainTextHeader("Created a post");
  }

}
