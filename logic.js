import * as helper from "./helper.js";

let word_box = document.getElementById('words-box');
let input_box = document.getElementById('input-box');
let time_box = document.querySelector('#time');
let refreshImg = document.querySelector('#refresh-img');
let statsBox = document.querySelector('#stats');
let menuIcon = document.querySelector('.menu-icon');
let labelContent = document.querySelector('#label-content');
let menuItemSelected = 'top';
helper.getWords(words_array,true);
let word_spans = document.querySelectorAll('.word');

let timerStart = false, startTime, endTime, currentTime = 60;
let index = 0, keyStrokesTillNow = 0, totalKeyStrokes = 0;
let correct_words = 0, wrong_words = 0, word_status;
let intervalId = 0;
let charsTyped = 0;

input_box.addEventListener('keydown',(e)=>{

    let specialChars = " .,?!";
    if(specialChars.includes(e.key))
    {
        console.log(`special character ${e.key}`);
    }
    if(timerStart == false)
    {
        startTime = Date.now();
        timerStart = true;
        intervalId = timer(Date.now());//TIMER STARTED
    }
    word_spans[index].scrollIntoView();
    word_spans[index].classList.add('current-word');

    if(e.key === ' ')
    {
        
        e.preventDefault();
        if(input_box.value !== '')
        {
            keyStrokesTillNow = word_spans[index].textContent.length + 1;
            totalKeyStrokes = totalKeyStrokes + keyStrokesTillNow;
            //&& word_spans[index].textContent.length == input_box.value.length//move forward if all correct logic
            if(charsTyped !== word_spans[index].textContent.length)
            {
                word_status = false;
            }
            console.log(`word status is = ${word_status}`);
            if(word_status === true )
            {
                correct_words++;
                word_spans[index].classList.add('correct');
            }
            if(word_status === false)
            {
                word_spans[index].classList.add('incorrect');
                wrong_words++;
            }
            word_spans[index].classList.remove('current-word');
            input_box.value = '';
            index++;
            word_spans[index].classList.add('current-word');
            word_spans[index].scrollIntoView();
            word_status = 'undefined'; 
        }
       
    }

    
    //if((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122))
    else if(e.key >= 'a' && e.key <= 'z' || specialChars.includes(e.key))
    {        
        word_status = 'undefined';
        let value = input_box.value + e.key;
        let wordStr = word_spans[index].textContent;
        word_status = checkingLogic(value, wordStr, word_spans[index]);
    }

    else if(e.code == 'Backspace')
    {
        let currentValue = input_box.value;
        let valueAfterBackspce = currentValue.slice(0,currentValue.length-1);
        console.log(`the value after backspace is ${valueAfterBackspce}`);
        let wordStr = word_spans[index].textContent;
        word_status = checkingLogic(valueAfterBackspce, wordStr, word_spans[index]);
    }

    if(index + 1 > 301)//LENGTH BASED STOPAGE
    {
        clearInterval(intervalId);
        input_box.disabled = true;
        labelContent.textContent = 'Test finished';
        endTime = Date.now();
        helper.calculate_stats(totalKeyStrokes, startTime, endTime, correct_words, wrong_words);
    }
});

function checkingLogic(inputStr, wordStr, word)
{
    charsTyped = inputStr.length;
    // console.log(`checking word ${wordStr}`);
    // console.log(`checking string ${inputStr}`);
    let status;
    if(wordStr.includes(inputStr))
    {
        status = true;
        if(word.classList.contains('incorrect'))
        {
            word.classList.remove('incorrect');
        }
    }
    else
    {
        status = false;
        word.classList.add("incorrect");
    }
    console.log("     ");
    return status;
}

function timer(timeBegin)
{
    let intervalId = setInterval(function(){

        let time = Math.floor((Date.now() - timeBegin) /1000);
        currentTime = 60 - time;
        if(currentTime <10)
        {
            time_box.textContent = "0:0" + currentTime;    
        }
        else
        {
            time_box.textContent = `0:${currentTime}`;
        }
        
        if(currentTime <= 0)
        {
            input_box.disabled = true;
            console.log('called');
            labelContent.textContent = 'Test finished';
            endTime = Date.now();
            clearInterval(intervalId);
            helper.calculate_stats(totalKeyStrokes, startTime, endTime, correct_words, wrong_words);        
        }
    
    },1000);

    return intervalId;
}

refreshImg.addEventListener('click',refresh);
function refresh(flag)
{
    input_box.value = "";
    clearInterval(intervalId);
    time_box.textContent = "1:00";
    input_box.disabled = false;
    statsBox.style.display = 'none';
    labelContent.textContent = 'Type here...';
    word_box.innerHTML = '';
    if(menuItemSelected === 'random')
    {
        console.log('in random refresh');
        if(flag != false)
        {
            quotes();
        }
        helper.getWords(words_array,false);
    }
    else
    {
        helper.getWords(words_array,true);
    }
    
    word_spans =document.querySelectorAll('.word');
    index = 0, keyStrokesTillNow = 0, totalKeyStrokes = 0;
    correct_words = 0, wrong_words = 0;
    timerStart = false;
    word_spans[index].scrollIntoView();
}

let menu = document.querySelector('#menu');
let mainContainer = document.querySelector('.main-container');

menuIcon.addEventListener('click',function(e){
    menu.style.display = 'block';
    menu.style.width = '25%';
    mainContainer.style.marginLeft = '30%';
    mainContainer.style.filter = 'blur(5px)';
});

let menuCloseIcon = document.querySelector('.close-menu-icon');
menuCloseIcon.addEventListener('click',function(e){
    menu.style.width = '0';
    mainContainer.style.marginLeft = '62px';
    mainContainer.style.filter = 'none';
    
})


//******************//
//AJAX FUNTIONALITY//
//****************//

let options = document.querySelectorAll('.options li');
$(options).click(function(){

    let selection = $(this).attr('value');
    menuItemSelected = selection;
    console.log(`current selection is ${menuItemSelected}`);
    if(selection === 'top' || selection === 'advanced')
    {
        $.post("getdata.php",
        {
            selection: selection
        },
        function(data,status)
        {
            words_array = JSON.parse(data);
            refresh('top/adv');
        });
    }
    else if(selection === 'random')
    {
        let quoteOffset = Math.floor(Math.random() * 50001);
        let quotesArray ;
        $.ajax({ 
            type : "GET", 
            url : "https://api.paperquotes.com/apiv1/quotes/?lang=en&minlength=15&offset="+ quoteOffset, 
            beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token b4ae6514eb002ab5d31384cfa2c5661fa13b71fc');},
            success : function(result) { 
                console.log('got quotes');
                quotesArray = result.results;
                let quoteText = '';
                for(let quote of quotesArray)
                {
                    quoteText += `${quote.quote} `;
                    
                }
                quoteText = quoteText.replace(/’/g, "'");
                words_array = quoteText.split(" ");
                refresh(false);
            }, 
            error : function(result) { 
                console.log('unable to get the data');
            } 
        }); 
        
    }
});

function quotes()
{
    let quoteOffset = Math.floor(Math.random() * 50001);
    let quotesArray ;
    $.ajax({ 
        type : "GET", 
        url : "https://api.paperquotes.com/apiv1/quotes/?lang=en&minlength=15&offset="+ quoteOffset, 
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token b4ae6514eb002ab5d31384cfa2c5661fa13b71fc');},
        success : function(result) { 
            console.log('got quotes');
            quotesArray = result.results;
            let quoteText = '';
            for(let quote of quotesArray)
            {
                quoteText += `${quote.quote} `;
                
            }
            quoteText = quoteText.replace(/’/g, "'");
            words_array = quoteText.split(" ");
        }, 
        error : function(result) { 
            console.log('unable to get the data');
        } 
    }); 
}