const array = ['jona', 'FC', '210', 'Keeno', 'FC']
const inserted = '10'
const FC = 'Keeno FC';

const target = array[2] // '210'

const [name, tag] = FC.split(' ')

const exists = array.includes(name) && array.includes(tag)



if (target.slice(0, 2) === inserted) {
    if(exists)
      {
       const isMatch = array.some((_, i) =>
       array[i] === name &&
       array[i + 1] === tag &&
        !isNaN(array[i + 2]) // ensures it's a number like '210'
       )  

      console.log(isMatch ? 'Correct order' : 'Not in order')
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