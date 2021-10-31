<?
session_start();

if (isset($_SESSION['email'])) {
  header('Location: /login/second-step.php');
}

$users = array(
  sha1('adminimda@gmail.com') => '70033451de355e8bbbd76d80fdb25fd9b89724fc' //pumpumpumpkin
);

if (isset($_POST['submit'])) {
  $raw_email = $_POST['email'];
  $raw_password = $_POST['password'];

  $email_hash = sha1($raw_email);
  $password_hash = sha1($raw_password);

  if (isset($users[$email_hash])) {
    $password = $users[$email_hash];

    if ($password === $password_hash) {
      $_SESSION['email'] = $raw_email;

      header('Location: /login/second-step.php');

      exit();
    }
  }

  echo('
    <div class="alert alert-danger alert-dismissible" role="alert">
      User with such email and password not found
      <button data-bs-dismiss="alert" type="button" class="btn-close" aria-label="Close"></button>
    </div>
  ');
}

include('./first-step.html');
?>  