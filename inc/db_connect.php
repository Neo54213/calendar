<?php
/**
 * Created by PhpStorm.
 * User: Stas
 * Date: 22.11.2016
 * Time: 8:52
 */
// Параметры подключения к серверу
$dblocation = "localhost";
$dbuser  = "root";
$dbpassword = "";
$dbname = 'people';
//Подключение к серверу
try{
    $db = new pdo('mysql:host='.$dblocation.";dbname=$dbname", $dbuser, $dbpassword);
    $db->query("SET NAMES utf8");
}catch(PDOException $e){
    $db = null;
}