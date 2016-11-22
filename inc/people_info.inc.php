<?php
/**
 * Created by PhpStorm.
 * User: Stas
 * Date: 22.11.2016
 * Time: 21:20
 */
if(isset($_GET['birthday']) && isset($people[0])){
    $i = 0;
    do{
        echo "{$people[$i]['birthday']} числа свой день рождения празднует {$people[$i]['last_name']} {$people[$i]['first_name']} ";
        if(isset($people[$i]['fathers_name'])){
            echo "{$people[$i]['fathers_name']}";
        }
        echo '<br>';
        $i++;
    }while( $i < count($people) );
}elseif(isset($_GET['birthday'])){
    echo "Именинников нет.";
}