<?php

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
    if (isset($_GET[POST_ID_QUERY])) {
      $this->getSinglePost();
      return;
    }

    $this->getProjectList();
  }

  //============================================================================
  // Generates the data containing information about all projects.
  //============================================================================
  public function getProjectList() {
    $this->db->setTableScope('projects');
    $resultSet = $this->wrapResult($this->db->getAll("ALL"));
    ResponseHelpers::outputWithJsonHeader($resultSet);
  }

  //============================================================================
  // Creates a JSON-serializable key-value pair encompassing the post data.
  //============================================================================
  private function wrapResult($result) {
    $output = array();
    foreach ($result as $result) {
      $output[] = array(
        "name"          => $result['name'],
        "title"         => $result['title'],
        "summary"       => $result['summary'],
        "info"          => $result['info'],
        "link"          => $result['link'],
        "resourcesUrl"  => $result['resourcesUrl']
      );
    }

    return $output;
  }
}
