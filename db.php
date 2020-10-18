<?php 

define('DB_NAME','words');
define('HOST','localhost');
define('USER','root');
define('PASS','123456');
define('CHARSET','utf8mb4');


$dsn = "mysql:host=".HOST.";dbname=".DB_NAME.";charset=".CHARSET;
$options = [
    PDO::ATTR_ERRMODE=> PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_EMULATE_PREPARES =>false
];
try{
    $pdo = new PDO($dsn,USER,PASS,$options);
    $testingVariable = "this is a varibale";
}catch(PDOException $e){
    echo "ERROR".$e->getMessage();
}
?>