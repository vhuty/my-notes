<?
  include('../auth.php');

  $email_hash = sha1($_SESSION['email']);
  $filename = '../assets/' . $email_hash;

  if (isset($_POST['submit'])) {
    $notes = array_filter($_POST, function ($value) {
      return str_starts_with($value, 'note');
    });

    file_put_contents($filename, implode('\n', $notes));

    exit();
  }

  if (!empty($_GET['json'])) {
    $notes = array();

    if (file_exists($filename)) {
      $file_content = file_get_contents($filename);
      $notes = explode('\n', $file_content);
    }

    header('Content-type: application/json');

    echo(json_encode($notes));

    exit();
  }

  include('./notes.html');
?>
