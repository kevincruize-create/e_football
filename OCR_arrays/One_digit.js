const process = (array, sequenceVar) => {





let firstDigit = null



const sequence = sequenceVar.split(' '); // ['Jay','FC'] or ['Kevin','Team']

let prevValue = null;
let nextValue = null;
let Deciding_value = null

for (let i = 0; i <= array.length - sequence.length; i++) {
  // Check if the sequence matches at position i
  if (sequence.every((v, j) => array[i + j] === v)) { // ✅ use array, not arr
    prevValue = i > 0 ? array[i - 1] : null;              // element before the sequence
    nextValue = array[i + sequence.length] ?? null;       // element after the sequence
    break; // stop after the first match
  }
}

if( nextValue !== null)
{
   console.log('Next value:', nextValue);
   Deciding_value = nextValue
}

if(prevValue !== null)
{
  console.log('Previous value:', prevValue);
  Deciding_value = prevValue
}

if(prevValue === null && nextValue === null)
{
 // console.log('invalid team')
  return 'invalid team'
}




if(Deciding_value.toString().length == 2)
{
  if(Deciding_value == nextValue)
  {
     firstDigit = Deciding_value?.[0] ?? null;
  }

  if(Deciding_value == prevValue)
  {
     firstDigit = Deciding_value?.[1] ?? null;
  }
  
}

if(Deciding_value.toString().length == 3)
{
  if(parseInt(Deciding_value.toString()[0]) == 0)
  {
       if(Deciding_value == nextValue)
       {
       firstDigit = Deciding_value?.[0] ?? null;
       }
 
       if(Deciding_value == prevValue)
       {
        firstDigit = parseInt(Deciding_value % 100);
       }
  }



  else{
    // add number
    const inserted = '21'

    
    const add_number = (array, Deciding_value, sequenceVar, inserted) =>{
          const target = Deciding_value // '210'

          const [name, tag] = sequenceVar.split(' ')

          const exists = array.includes(name) && array.includes(tag)



            if (target.slice(0, 2) === inserted) {
               if(exists)
                 {
                   const isMatch = array.some((_, i) =>
                   array[i] === name &&
                   array[i + 1] === tag &&
                   !isNaN(array[i + 2]) // ensures it's a number like '210'
                 )  

                  console.log(isMatch ? 'Before instered digit' : 'Not in order')
              }
             }




             if (target % 100 === parseInt(inserted)) {
               const isAfter = array.some((_, i) =>
               array[i] === target &&
               array[i + 1] === name &&
               array[i + 2] === tag
             )

              console.log(isAfter ? 'Comes after 210' : 'Not after 210')

            }
    }


    add_number(array, Deciding_value, sequenceVar, inserted)


    console.log('add number'); 
  }

  
}

if(Deciding_value.toString().length == 4)
{
       if(Deciding_value == nextValue)
       {
       firstDigit = parseInt(Deciding_value.toString().slice(0, 2));
       }
 
       if(Deciding_value == prevValue)
       {
        console.log('prev')
        firstDigit = parseInt(Deciding_value % 100);
       }
     

}

console.log(`The score for ${sequence} is ${firstDigit}`)

return `The score for ${sequence.join(' ')} is ${firstDigit}`;

}

module.exports = process;