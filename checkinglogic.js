// CHECKING WORD CHARACTER BY CHARACTER
function checkWord(char, arr, index, word)
{
    console.log(index +' is the word array index');
    if(char == arr[index] && input_box.value.length == index +1)//try with triple equals also
    {
        console.log(`currently checking ${char}`);
        arr_index++;
        word.classList.add('correct');

        if(word.classList.contains('incorrect'))
        {
            console.log('entered');
            word.classList.remove('incorrect');
            
        }
        
    }
    else{
        if(word.classList.contains('correct'))
        {
            word.classList.remove('correct');
            word.classList.add("incorrect");
        }
        else{
            word.classList.add("incorrect");
        }
        
    }
    console.log("     ");
}