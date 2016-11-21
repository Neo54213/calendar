<pre>
<?php
/**
 * Created by PhpStorm.
 * User: Stas
 * Date: 06.11.2016
 * Time: 13:08
 */
const DB_USER = 'root';
const DB_PASSWORD = '';
if(isset($_GET['id'])){
    $db = new PDO('mysql:host=localhost;dbname=people', DB_USER, DB_PASSWORD);
    $db->query("SET NAMES utf8");
    $id = $_GET['id'];
    $sql = "SELECT id, last_name, first_name, fathers_name, birthday, birthmonth, age, city FROM people WHERE id=$id";
    $statement = $db->prepare($sql);
    $statement->execute([$id]);
    foreach($statement as $row) {
        print_r($row);
    }
    $db = null;
}
?>
</pre>