<?
session_start();

unset(
  $_SESSION['id'], 
  $_SESSION['email'], 
  $_SESSION['name'], 
  $_SESSION['age']
);

session_destroy();

header('Location: /');
?>