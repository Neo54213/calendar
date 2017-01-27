<?php

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $id = $_POST['birthday'];
    $sql = "SELECT * FROM people WHERE birthday=?";
    $statement = $db->prepare($sql);
    $statement->execute([$id]);
    $db = null;
    foreach($statement as $person) {
        $people[] = $person;
    }
    $people = json_encode($people);
    echo "$people";
    exit;
}
?>