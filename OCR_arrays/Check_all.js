const two_digits = require('./Two_digits')
const one_digit = require('./One_digit')

const process = (array, sequenceVar) => {


const integerCount = array.filter(item => Number.isInteger(Number(item))).length;

if (integerCount >= 2) {

  console.log('two')
  return two_digits(array, sequenceVar)

} else {
  
   console.log('one')
  return one_digit(array, sequenceVar)

}

}

module.exports = process;