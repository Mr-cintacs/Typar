<?php

include("db.php");
$words_arr=[];

function loadWords($pdo,$tableName)
{
    global $words_arr;
    try{
        $query = "select * from $tableName";
        $stmt = $pdo->query($query);
        
        while($row = $stmt->fetch(PDO::FETCH_OBJ))
        {
            array_push($words_arr,$row->word);
        }
    }catch(PDOException $e){
        echo "there was something wrong with showing the data".$e->getMessage();
    }
}

if(isset($_POST['selection']))
{
    $selection = $_POST['selection'];
    
    if($selection == 'advanced')
    {
        loadWords($pdo,'adv_words');        
    }
    else
    {
        loadWords($pdo,'300_words');
    }
}
else    
{
    loadWords($pdo,'300_words');
} 

echo (isset($_POST['selection']))? json_encode($words_arr): "" ;
?>
