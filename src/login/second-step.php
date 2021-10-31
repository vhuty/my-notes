<?
session_start();

if (isset($_SESSION['id'])) {
  header('Location: /');
}

if (!isset($_SESSION['email'])) {
  header('Location: /login/index.php');

  exit();
}

if (isset($_POST['submit'])) {
  $_SESSION['name'] = $_POST['name'];
  $_SESSION['age'] = $_POST['age'];

  $_SESSION['id'] = uniqid();

  header('Location: /');

  exit();
}

include('./second-step.html');
?>  