<?php
require_once 'inc/db_connect.inc.php';
require_once 'inc/base.inc.php';
?>
<!DOCTYPE html>
<html>
<head>
	<title>Календарь</title>
	<meta charset='utf-8'/>
	<link rel="stylesheet" type="text/css" href="css/style.css"/>
    <script src='js/jquery-3.1.1.js'></script>
</head>
<body>
	<h1></h1>
	<table id="calendar">

	</table>
	<div>
		<div id="infoAboutPerson"></div>
	</div>
	<!--input type="button" value='Добавить день'/><br/>
	<input type="button" value='Удалить день'/-->
	<script src="js/script.js"></script>
</body>
</html>