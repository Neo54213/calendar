<?php
/**
 * Created by PhpStorm.
 * User: Stas
 * Date: 06.11.2016
 * Time: 13:08
 */
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $id = $_POST['birthday'];
    $sql    = "SELECT * FROM people WHERE birthday=?";
    $statement = $db->prepare($sql);
    $res = $statement->execute([$id]);
    $db = null;
    foreach($statement as $person) {
        $people[] = $person;
    }
    if($people[1]['id']) {
        $people = json_encode($people);
        echo $people;
    }else{
        echo "no info";
    }
    exit;
}