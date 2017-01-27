<?php
require_once 'inc/db_connect.php';
require_once 'inc/base.php';
?>
<!DOCTYPE html>
<html>
<head>
	<title>Календарь</title>
	<meta charset='utf-8'/>
	<link rel="stylesheet" type="text/css" href="css/style.css"/>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
    <script src='js/jquery-3.1.1.js'></script>
    <script src='js/bootstrap.min.js'></script>
</head>
<body>
	<h1 class="head-title"></h1>
	<section id="main">
		<div class="container">
		<div class="row">
			<div class="col-md-4 login-form">
				<form>
				<label for="exampleInputEmail1">Email адрес</label>
				  <div class="input-group">
				    <span class="input-group-addon">@</span>
				    <input type="text" class="form-control" id="inputGroupSuccess4" aria-describedby="inputGroupSuccess4Status">
				  </div>
				  <div class="form-group">
				    <label for="exampleInputPassword1">Пароль</label>
				    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
				  </div>
				  <div class="checkbox">
				    <label>
				      <input type="checkbox"> Запомнить
				    </label>
				  </div>
				  <button type="submit" class="btn btn-default">Войти</button>
				</form>
			</div>
			<div class="col-md-8 calendar-form">
				<table id="calendar" class="table"></table>
					<div>
						<div id="infoAboutPerson"></div>
					</div>
			</div>
			</div>
		</div>
	</section>
	<!--input type="button" value='Добавить день'/><br/>
	<input type="button" value='Удалить день'/-->
	<script src="js/script.js"></script>
</body>
</html>