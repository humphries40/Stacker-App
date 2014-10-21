<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>DAViCal<?php
if ( isset($title) ) {
  echo " - ". $title;
}
else {
  echo " CalDAV Server";
}
?></title>
<link rel="stylesheet" type="text/css" href="style.css" />
</head>
<body>
<div id="pageContainer">
<div id="header">
<div id="title"><?php
if ( isset($title) ) {
  echo $title;
}
else {
  echo "DAViCal CalDAV Server";
}
?></div>
<div id="subTitle">A CalDAV Store</div>
<div id="headerLinks">
<a href="index.php" class="hlink">Home</a> |
<a href="installation.php" class="hlink">Installation</a> |
<a href="clients.php" class="hlink">Client Config</a> |
<a href="administration.php" class="hlink">Administration</a> |
<a href="background.php" class="hlink">Background</a> |
<a href="http://wiki.davical.org/w/Main_Page" class="hlink">DAViCal Wiki</a> |
<a href="https://gitlab.com/davical-project/davical" class="hlink">DAViCal on GitLab</a>
</div>
</div>
<div id="pageContent">
<?php
  $tags_to_be_closed = "</div>\n";
  if ( isset($two_panes) && $two_panes ) {
    $tags_to_be_closed .= $tags_to_be_closed;
    echo '<div id="leftSide">';
  }
?>
<hr />
