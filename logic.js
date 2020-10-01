let word_box = document.getElementById('words-box');
let input_box = document.getElementById('input-box');
let time_box = document.querySelector('#time');
let refreshImg = document.querySelector('#refresh-img');
let statsBox = document.querySelector('#stats');

let randomizeWords = (words_array) =>{

    let i, temp, randomIndex;

    for(i=words_array.length -1; i>=0; i--)
    {
        randomIndex = Math.floor(Math.random() * words_array.length);

        temp = words_array[randomIndex];
        words_array[randomIndex] = words_array[i];
        words_array[i] = temp;
    }

};

let getWords = (words_array)=>{
    randomizeWords(words_array);
    for(let word of words_array)
    {   word_box.innerHTML +='<span class="word">' + word + '</span>' + ' '  ;
    }
};

getWords(words_array);
let word_spans =document.querySelectorAll('.word');
let timerStart = false, startTime, endTime, currentTime = 60;
let index = 0;
let keyStrokesTillNow = 0, totalKeyStrokes = 0;
let correct_words = 0, wrong_words = 0, word_status;
let intervalId = 0;

input_box.addEventListener('keydown',(e)=>{

    if(timerStart == false)
    {
        startTime = Date.now();
        timerStart = true;
        intervalId = timer(Date.now());
    }
    
    word_spans[index].scrollIntoView();
    word_spans[index].classList.add('current-word');

    if(e.key === ' ')
    {
        e.preventDefault();
        keyStrokesTillNow = word_spans[index].textContent.length + 1;
        totalKeyStrokes = totalKeyStrokes + keyStrokesTillNow;

        if(word_status)
        {
            correct_words++;
            word_spans[index].classList.add('correct');
        }
        else{
            wrong_words++;
        }

        word_spans[index].classList.remove('current-word');
        input_box.value = '';
        index++;
        word_spans[index].classList.add('current-word');
        word_spans[index].scrollIntoView();
    }

    
    //if((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122))
    else if(e.key >= 'a' && e.key <= 'z')
    {        
        let value = input_box.value + e.key;
        let wordStr = word_spans[index].textContent;
        checkingLogic(value, wordStr, word_spans[index]);
    }

    else if(e.code == 'Backspace')
    {
        let value = input_box.value;
        let wordStr = word_spans[index].textContent;
        checkingLogic(value, wordStr, word_spans[index]);
    }

    // if(index + 1 > 3)//LENGTH BASED STOPAGE
    // {
    //     input_box.disabled = true;
    //     input_box.placeholder = 'Test finished';
    //     endTime = Date.now();
    //     calculate_stats(totalKeyStrokes, startTime, endTime, correct_words, wrong_words);
    // }
    // if(currentTime <= 0)
    // {
    //     console.log('timer finish');
    //     input_box.disabled = true;
    //     input_box.placeholder = 'Test finished';
    //     endTime = Date.now();
    //     clearInterval(intervalId);
    //     calculate_stats(totalKeyStrokes, startTime, endTime, correct_words, wrong_words);        

    // }
});

function checkingLogic(inputStr, wordStr, word)
{
    console.log(`checking word ${wordStr}`);
    console.log(`checking string ${inputStr}`);
    if(wordStr.includes(inputStr))
    {
        word_status = true;
        if(word.classList.contains('incorrect'))
        {
            word.classList.remove('incorrect');
        }
    }
    else
    {
        word_status = false;
        word.classList.add("incorrect");
    }
    console.log("     ");
}

function calculate_stats(entries, startTime, endTime, correct, wrong)
{
    statsBox.style.display = 'flex';

    let wpm = document.querySelector('#wpm');
    let correctField = document.querySelector('#correct-words');
    let wrongField = document.querySelector('#wrong-words');
    let accField = document.querySelector('#accuracy');

    let timeTaken = Math.floor((endTime - startTime)/1000);
    let minutesTaken = timeTaken/60;
    let netWpm = ((entries/5) - wrong )/ 1;
    let grossWpm = ((entries/5)/minutesTaken);
    let accuracy = (netWpm/grossWpm) * 100;

    wpm.textContent = netWpm;
    correctField.textContent = correct;
    wrongField.textContent = wrong;
    accField.textContent = accuracy;
}

let timeBegin = Date.now();

function timer(timeBegin)
{
    let intervalId = setInterval(function(){

        let time = Math.floor((Date.now() - timeBegin) /1000);
        currentTime = 60 - time;
        if(currentTime <10)
        {
            console.log('flagged');
            time_box.textContent = "0:0" + currentTime;    
        }
        else
        {
            time_box.textContent = `0:${currentTime}`;
        }
        
        if(currentTime <= 0)
        {
            console.log('timer finish');
            input_box.disabled = true;
            input_box.placeholder = 'Test finished';
            endTime = Date.now();
            clearInterval(intervalId);
            calculate_stats(totalKeyStrokes, startTime, endTime, correct_words, wrong_words);        
        }
        console.log(time);
    
    },1000);

    return intervalId;
}
refreshImg.addEventListener('onclick',function (e){
    input_box.disabled = false;
    statusBox.display = 'none';
});