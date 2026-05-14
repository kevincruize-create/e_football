const two_digits = require('./Two_digits');
const one_digit = require('./One_digit');

const isNumericString = (value) => /^\d+$/.test(value);

const process = (array, sequenceVar) => {

  // 1. Remove first 3, 2, or 1 items if they are numeric
  if (array.slice(0, 3).every(isNumericString)) {
    array.splice(0, 3);
  } else if (array.slice(0, 2).every(isNumericString)) {
    array.splice(0, 2);
  } else if (isNumericString(array[0])) {
    array.splice(0, 1);
  }

  console.log('new_array', array)

  // 2. Count numeric values AFTER cleanup
  const integerCount = array.filter(item =>
    Number.isInteger(Number(item))
  ).length;

  // 3. Decide which function to call
  if (integerCount >= 2) {
    console.log('two');
    return two_digits(array, sequenceVar);
  } else {
    console.log('one');
    return one_digit(array, sequenceVar);
  }
};

module.exports = process;
