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

    for ($i = 0; $i < 8; $i++) {
      $food = array(
        "id"          => "food" . $i,
        "title"       => "Food ID " . $i,
        "description" => "WIP: still being coded here",
        "imageSrc"    => "//lorempixel.com/300/200/food/" . ($i + 1)
      );

      $output[] = $food;
    }

    ResponseHelpers::outputWithJsonHeader($output);
  }

}
