<?php

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
    $food = array(
      "id"          => "foooooo",
      "title"       => "work in progress",
      "description" => "still being coded here",
      "imageHref"   => ""
    );

    $output = array($food);
    ResponseHelpers::outputWithJsonHeader($output);
  }

}
