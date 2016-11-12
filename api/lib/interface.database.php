<?php

interface IDatabase
{
  public function connect($params);
  public function rawExec($rawSQL);
  public function setTableScope($table);
  public function insert($keyValuePairs, $table = "");
  public function update($keyValuePairs, $where, $options = array(), $table = "");
  public function getAll($fields, $table = "");
  public function getAllFields($table = "");
  public function getWhere($fields, $where, $options = array(), $table = "");
  public function getErrorMessages();
}
