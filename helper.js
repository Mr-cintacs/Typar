 export {randomizeWords, getWords};

 let word_box = document.getElementById('words-box');
 let randomizeWords = (words_array) =>{

    console.log(`randomize called`);
    let i, temp, randomIndex;

    for(i=words_array.length -1; i>=0; i--)
    {
        randomIndex = Math.floor(Math.random() * words_array.length);

        temp = words_array[randomIndex];
        words_array[randomIndex] = words_array[i];
        words_array[i] = temp;
    }

};

let getWords = (words_array,randomize)=>{
    if(randomize === true)
    {
        randomizeWords(words_array);
    }
    for(let word of words_array)
    {   word_box.innerHTML +='<span class="word">' + word + '</span>' + ' '  ;
    }
};

let value = 10;
