

const process = (array, sequenceVar) => {

console.log(sequenceVar)


let firstDigit = null

// This can change dynamically


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

if(nextValue !== null)
{
   console.log('Next value:', nextValue);
   Deciding_value = nextValue
}

if(prevValue !== null)
{
  console.log('Previous value:', prevValue);
  Deciding_value = prevValue
}

//console.log(`The score for ${sequence} is ${Deciding_value}`)
return `The score for ${sequence.join(' ')} is ${Deciding_value}`;
}

module.exports = process;