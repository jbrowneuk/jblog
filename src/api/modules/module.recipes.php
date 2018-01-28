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
    $output = array();

    for ($i = 0; $i < 16; $i++) {
      $food = array(
        "id"          => "food" . $i,
        "title"       => "Food ID " . $i,
        "description" => "WIP: still being coded here",
        "imageSrc"    => "//picsum.photos/300/200/?image=" . ($i + 1)
      );

      $output[] = $food;
    }

    ResponseHelpers::outputWithJsonHeader($output);
  }

}
