<?php 
    include('getdata.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Typr</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <img id="header-icon" src="images/typing.png" alt="A cool icon">
        <h1>TYPR.</h1>
    </header>



    <div class="main-container">
        <div class="words-container">
            <p id="words-box"></p>
        </div>
    
        <div class="input-container">
            <input type="text" id="input-box" placeholder="type here...." name="input" >
            <span id='time'>1:00</span>
            <button id='refresh'><img id='refresh-img' src="images/refresh2.png" alt="refresh"></button>
        </div>
    
        <div id="stats">
            <div id="title">Stats</div>
            <div class="box">
                <p>Net WPM : <span id='wpm' class='result'></span></p>
            </div>
    
            <div class="box">
                <p>Correct Words : <span id='correct-words' class='result'></span></p>
            </div>
    
            <div class="box">
                <p>Wrong Words : <span id='wrong-words' class='result'></span></p>
            </div>
    
            <div class="box">
                <p>Accuracy : <span id='accuracy' class='result'></span></p>
            </div>
        </div>
    </div>
    <footer></footer>

    <script>
        let test=10;
        let words_array = JSON.parse('<?php echo json_encode($words_arr); ?>');
    </script>
    <script src="logic.js"></script>
</body>
</html>