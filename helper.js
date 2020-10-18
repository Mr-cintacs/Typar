 export {randomizeWords, getWords, calculate_stats};

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
    let netWpm = ((entries/5) - wrong )/ minutesTaken;
    let grossWpm = ((entries/5)/minutesTaken);
    let accuracy = (netWpm/grossWpm) * 100;

    wpm.textContent = netWpm;
    correctField.textContent = correct;
    wrongField.textContent = wrong;
    accField.textContent = accuracy;
}

let value = 10;
