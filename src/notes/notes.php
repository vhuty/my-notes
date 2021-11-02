<?
  include('../auth.php');

  $assets_dir = '../assets/';

  if(!is_dir($assets_dir)) {
    mkdir($assets_dir);
  }

  $email = $_SESSION['email'];
  $filename = $assets_dir . sha1($email);

  if (isset($_POST['submit'])) {
    $notes = array_filter(
      $_POST, 
      fn ($key) => str_starts_with($key, 'note'), 
      ARRAY_FILTER_USE_KEY
    );

    file_put_contents($filename, implode('\n', $notes));

    $sent = mail($email, 'My notes', implode(', ', $notes));

    header('Location: /');

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
