 export {randomizeWords, getWords, calculate_stats,getComment};

 let word_box = document.getElementById('words-box');
 let statsBox = document.querySelector('#stats');

 //FUNCTION TO RANDOMIZE CONTENTS OF ARRAY 
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



//FUNCTION TO DISPLAY THE WORDS IN THE IN WORDS CONTAINER
let getWords = (words_array,randomize)=>{
    if(randomize === true)
    {
        randomizeWords(words_array);
    }
    for(let word of words_array)
    {   word_box.innerHTML +='<span class="word">' + word + '</span>' + ' '  ;
    }
};



//FUNCTION TO CALCULATE THE STATS
function calculate_stats(entries, startTime, endTime, correct, wrong)
{
    statsBox.style.display = 'flex';

    let wpm = document.querySelector('#wpm');
    let correctField = document.querySelector('#correct-words');
    let wrongField = document.querySelector('#wrong-words');
    let accField = document.querySelector('#accuracy');

    let timeTaken = Math.floor((endTime - startTime)/1000);
    let minutesTaken = timeTaken/60;
    let netWpm = Math.floor(((entries/5) - wrong )/ minutesTaken);
    let grossWpm = ((entries/5)/minutesTaken);
    let accuracy = ((netWpm/grossWpm) * 100) + '%';

    if(isNaN(accuracy))
    {
        accuracy = 'N/A';
    }

    wpm.textContent = netWpm;
    correctField.textContent = correct;
    correctField.style.color = '#2a9d8f';
    wrongField.textContent = wrong;
    wrongField.style.color = '#DA2F35';
    accField.textContent = accuracy;
}

function getComment(typingSpeed)
{
    let comment = '';

    if(typingSpeed <=10 )
    {
        comment = 'Slow down Flash!';
    }
    else if(typingSpeed <= 20)
    {
        comment = 'YIKES';
    }
    else if(typingSpeed <= 30)
    {
        comment = 'ok BOOMER!';
    }
    else if(typingSpeed <= 40)
    {
        comment = 'Easy there grandma.';
    }
    else if(typingSpeed <= 50)
    {
        comment = 'Decent!!';
    }
    else if(typingSpeed <= 60)
    {
        comment = 'You are now officially AVERAGE!';
    }
    else if(typingSpeed <= 70)
    {
        comment = 'Getting better';
    }else if(typingSpeed <= 80)
    {
        comment = 'The goal is near !!';
    }
    return comment;
}
