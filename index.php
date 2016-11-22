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
</head>
<body>
	<h1></h1>
	<table id="calendar">

	</table>
	<div>
		<div name="infoAboutPerson" id="infoAboutPerson"><?php
				require_once 'inc/people_info.inc.php';
			?>
		</div>
	</div>
	<!--input type="button" value='Добавить день'/><br/>
	<input type="button" value='Удалить день'/-->
	<script src="js/script.js"></script>
</body>
</html>