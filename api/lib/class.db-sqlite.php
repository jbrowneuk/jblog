<?php

class Database implements IDatabase
{
  private $db;
  private $tablePrefix;
  private $tableScope;
  private $errorMessages;

  public function __construct()
  {
    $this->db = null;
    $this->tablePrefix = 'site_';
    $this->tableScope = 'default';
    $this->errorMessages = array();
  }

  public function connect($params)
  {
    if (!is_array($params))
    {
      return false;
    }

    $this->tablePrefix = $params['Prefix'];

    try
    {
      $this->db = new PDO('sqlite:' . $params['Database']);
    }
    catch (PDOException $e)
    {
      print 'Can\'t connect: ' . $e->getMessage();
      $this->db = null;
      return false;
    }

    return true;
  }

  public function rawExec($rawSQL)
  {
    throw new Exception('Don\'t do this.');
  }

  public function setTableScope($table)
  {
    if (StringExtensions::isEmpty($table))
    {
      return;
    }

    $this->tableScope = $table;
  }

  public function insert($keyValuePairs, $table = "")
  {
    // Sanity checks
    if (!is_array($keyValuePairs))
    {
      return false;
    }

    $this->setTableScope($table);

    $keys = array_keys($keyValuePairs);
    $safeColumnNames = implode(", ", $keys);
    $bindingStatements = ":" . implode(", :", $keys);

    $sql = "INSERT INTO `" . $this->generateTableName() . "` ($safeColumnNames) VALUES ($bindingStatements)";
    $statement = $this->db->prepare($sql);
    if ($statement === FALSE)
    {
      print "<p>Statement failure: $sql</p>";
      return false;
    }

    foreach ($keyValuePairs as $key => $value)
    {
      $statement->bindValue(":$key", $value);
    }

    $success = $statement->execute();
    if (!$success)
    {
      $this->errorMessages[] = $statement->errorInfo();
    }

    return $success;
  }

  public function update($keyValuePairs, $where, $options = array(), $table = "")
  {
    // Sanity checks
    if (!is_array($keyValuePairs) || !is_array($where))
    {
      return false;
    }

    $this->setTableScope($table);

    $columnsAndBindingStatements = "";
    foreach ($keyValuePairs as $key => $value)
    {
      if ($value == NULL)
      {
        continue;
      }

      if (!StringExtensions::isEmpty($columnsAndBindingStatements))
      {
        $columnsAndBindingStatements .= ", ";
      }

      $columnsAndBindingStatements .= "`$key` = :$key";
    }

    $sql = "UPDATE `" . $this->generateTableName() . "` SET $columnsAndBindingStatements";
    $hasWhereCondition = count($where) > 0;
    if ($hasWhereCondition)
    {
      $sql .= " WHERE";
      $whereClause = "";
      foreach ($where as $key => $value)
      {
        if (strlen($whereClause) > 0)
        {
          $whereClause .= " AND";
        }

        $whereClause .= " $key=:where$key";
      }

      $sql .= $whereClause;
    }

    $statement = $this->db->prepare($sql);
    if ($statement === FALSE)
    {
      print "<p>Statement failure: $sql</p>";
      return false;
    }

    foreach ($keyValuePairs as $key => $value)
    {
      if ($value == NULL)
      {
        continue;
      }

      $statement->bindValue(":$key", $value);
    }

    if ($hasWhereCondition)
    {
      foreach ($where as $key => $value)
      {
        $statement->bindValue(":where$key", $value);
      }
    }

    $success = $statement->execute();
    if (!$success)
    {
      $this->errorMessages[] = $statement->errorInfo();
    }

    return $success;
  }

  public function getAll($fields, $options = array(), $table = "")
  {
    return $this->getWhere($fields, array(), $options, $table);
  }

  public function getAllFields($options = array(), $table = "")
  {
    return $this->getWhere("ALL", array(), $options, $table);
  }

  public function getWhere($fields, $where, $options = array(), $table = "")
  {
    // Fix up fields specifier
    $fieldsFlat = "";
    if (is_array($fields))
    {
      $fieldsFlat = "`" . implode("`, `", $fields) . "`";
    }
    else
    {
      if ($fields === "ALL")
      {
        $fields = "*";
      }

      $fieldsFlat = $fields;
    }

    $this->setTableScope($table);
    $sql = "SELECT $fieldsFlat FROM `" . $this->generateTableName() . "`";
    $hasWhereCondition = count($where) > 0;
    if ($hasWhereCondition)
    {
      $whereClause = "";
      foreach ($where as $key => $value)
      {
        if (strlen($whereClause) > 0)
        {
          $whereClause .= " AND";
        }

        $searchScope = $this->generateWhereSearchScope($value);
        $whereClause .= " $key $searchScope :where$key";
      }

      $sql .= " WHERE" . $whereClause;
    }

    if (count($options) > 0)
    {
      foreach ($options as $option => $value)
      {
        $sql .= " $option $value";
      }
    }

    $statement = $this->db->prepare($sql);
    if ($statement === FALSE)
    {
      print "<p>Statement failure: $sql</p>";
      return array();
    }

    if ($hasWhereCondition)
    {
      foreach ($where as $key => $value)
      {
        if ($value[0] == '>' || $value[0] == '<')
        {
          $value = trim(substr($value, 1));
        }
        
        $statement->bindValue(":where$key", $value);
      }
    }

    $success = $statement->execute();
    if (!$success)
    {
      $this->errorMessages[] = $statement->errorInfo();
      return array();
    }

    $results = array();
    while ($row = $statement->fetch())
    {
      array_push($results, $row);
    }

    return $results;
  }

  public function getErrorMessages()
  {
    return $this->errorMessages;
  }

  private function generateTableName()
  {
    return $this->tablePrefix . $this->tableScope;
  }

  private function generateWhereSearchScope($value)
  {
    $hasWildcard = strpos($value, "%") !== FALSE;
    if ($hasWildcard)
    {
      return 'LIKE';
    }

    $hasGreaterOrLessThan = $value[0] == '<' || $value[0] == '>';
    if ($hasGreaterOrLessThan)
    {
      return $value[0];
    }

    return '=';
  }
}
