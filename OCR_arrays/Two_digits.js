

const process = (array, sequenceVar) => {

console.log(sequenceVar)


let firstDigit = null

// This can change dynamically


const sequence = sequenceVar.split(' '); // ['Jay','FC'] or ['Kevin','Team']

let prevValue = null;
let nextValue = null;
let Deciding_value = null
let next_next = null
let prev_prev = null
let declararion = ''
let judgement = null
let final_digit = 0

for (let i = 0; i <= array.length - sequence.length; i++) {
  // Check if the sequence matches at position i
  if (sequence.every((v, j) => array[i + j] === v)) { // ✅ use array, not arr
    prevValue = i > 0 ? array[i - 1] : null;              // element before the sequence
    nextValue = array[i + sequence.length] ?? null;

    next_next = array[i + sequence.length +1] ?? null;
    prev_prev = i > 0 ? array[i - 2] : null;  
           // element after the sequence
    break; // stop after the first match
  }
}

if(nextValue !== null)
{
   console.log('Next value:', nextValue);
   console.log('next next:', next_next);
   Deciding_value = nextValue
   final_digit = nextValue

   if(nextValue > parseInt(next_next))
  {
     declararion = `${sequence.join(' ')} on wins by ${nextValue} scores`
     judgement = 'win'
  }

  if(nextValue < parseInt(next_next))
  {
     declararion = `${sequence.join(' ')} on looses by ${nextValue} scores`
     judgement = 'loss'
  }

  if(nextValue == parseInt(next_next))
  {
     declararion = `${sequence.join(' ')} on draws by ${nextValue} scores`
     judgement = 'draw'
  }




}

if(prevValue !== null)
{
  console.log('Previous value:', prevValue);
  console.log('prev prev:', prev_prev);
  Deciding_value = prevValue
  final_digit = prevValue

     if(prevValue > parseInt(prev_prev))
  {
     declararion = `${sequence.join(' ')} on wins by ${prevValue} scores`
     judgement = 'win'
  }

  if(prevValue < parseInt(prev_prev))
  {
     declararion = `${sequence.join(' ')} on looses by ${prevValue} scores`
     judgement = 'loss'
  }

  if(prevValue == parseInt(prev_prev))
  {
     declararion = `${sequence.join(' ')} on draws by ${prevValue} scores`
     judgement = 'draw'
  }


}

//console.log(declararion)
//return `The score for ${sequence.join(' ')} is ${Deciding_value}`;
return {judgement, declararion, final_digit}
}

module.exports = process;
