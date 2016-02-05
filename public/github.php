<?php
$LOCAL_ROOT         = "/home/public_html";
$LOCAL_REPO_NAME    = "Human-Art";
$LOCAL_REPO         = "{$LOCAL_ROOT}/{$LOCAL_REPO_NAME}";
$REMOTE_REPO        = "git@github.com:CienProject2016/Human-Art.git";
$BRANCH             = "master";

$DATA = json_decode(file_get_contents('php://input'), true);
if ( $DATA['ref'] === 'refs/heads/master' ) {

  if( file_exists($LOCAL_REPO) ) {

    shell_exec("cd {$LOCAL_REPO} && git pull");

    die("done " . mktime());
  } else {

    shell_exec("cd {$LOCAL_ROOT} && git clone {$REMOTE_REPO}");

    die("done " . mktime());
  }
}

?>
