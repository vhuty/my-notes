<?
session_start();

if (!isset($_SESSION['id'])) {
  header("Location: /login/login.php");
}
?>
