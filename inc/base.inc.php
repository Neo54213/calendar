<pre>
<?php
/**
 * Created by PhpStorm.
 * User: Stas
 * Date: 06.11.2016
 * Time: 13:08
 */
if(isset($_GET['birthday'])){
    $id = $_GET['birthday'];
    $sql = "SELECT * FROM people WHERE birthday=?";
    $statement = $db->prepare($sql);
    $statement->execute([$id]);
    foreach($statement as $row) {
        $people[] = $row;
    }
    $db = null;
}
?>
</pre>