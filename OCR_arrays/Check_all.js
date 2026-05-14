const two_digits = require('./Two_digits');
const one_digit = require('./One_digit');

const isNumericString = (value) => /^\d+$/.test(value);

const countTrailingNumbers = (arr, max = 3) => {
  let count = 0;

  for (let i = arr.length - 1; i >= 0 && count < max; i--) {
    if (isNumericString(arr[i])) {
      count++;
    } else {
      break;
    }
  }

  return count;
};

const process = (array, sequenceVar) => {

  // 1. Remove leading numeric values (max 3)
  if (array.slice(0, 3).every(isNumericString)) {
    array.splice(0, 3);
  } else if (array.slice(0, 2).every(isNumericString)) {
    array.splice(0, 2);
  } else if (isNumericString(array[0])) {
    array.splice(0, 1);
  }

  console.log('new_array:', array);

  // 2. Count trailing numeric values (last 1–3)
  const trailingCount = countTrailingNumbers(array);

  // 3. OPTIONAL: remove trailing numeric values after detection
  if (trailingCount > 0) {
    array.splice(array.length - trailingCount, trailingCount);
  }

  // 4. Decide which function to call
  if (trailingCount >= 2) {
    console.log('two');
    return two_digits(array, sequenceVar);
  } else {
    console.log('one');
    return one_digit(array, sequenceVar);
  }
};

module.exports = process;
