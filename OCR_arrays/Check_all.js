const two_digits = require('./Two_digits')
const one_digit = require('./One_digit')

const process = (array, sequenceVar) => {


const integerCount = array.filter(item => Number.isInteger(Number(item))).length;

const isNumericString = (value) => /^\d+$/.test(value);

// first element
const firstIsInt = isNumericString(array[0]);

// first two elements
const firstTwoAreInt = array.slice(0, 2).every(isNumericString);

// first three elements
const firstThreeAreInt = array.slice(0, 3).every(isNumericString);

console.log(firstIsInt);        // true
console.log(firstTwoAreInt);    // false
console.log(firstThreeAreInt);  // false

if (integerCount >= 2) {

  console.log('two')
  return two_digits(array, sequenceVar)

} else {
  
   console.log('one')
  return one_digit(array, sequenceVar)

}

}

module.exports = process;
