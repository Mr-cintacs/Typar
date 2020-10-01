<?php

include("db.php");

$table_name = '300_words';
$words_arr=[];

try{
    $query = "select * from $table_name";
    $stmt = $pdo->query($query);

    while($row = $stmt->fetch(PDO::FETCH_OBJ))
    {
        array_push($words_arr,$row->word);
    }


}catch(PDOException $e){
    echo "there was something wrong with showing the data".$e->getMessage();
}

?>
