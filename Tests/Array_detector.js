

const array = ['AC', 'Millan', '0', '1', 'Franc', 'FC'];
const FC = 'AC Millan';

// Split the search phrase into words
const words = FC.split(' ');

// Check if all words exist
const exists = words.every(word => array.includes(word));

if (exists) {
  // Find the starting index of the phrase
  const startIndex = array.findIndex((item, i) =>
    words.every((word, j) => array[i + j] === word)
  );

  if (startIndex !== -1) {
    // Get all values after the phrase
    const nextValues = array.slice(startIndex + words.length);

    // Get immediate next value
    const nextValue = array[startIndex + words.length];

    console.log('Exists:', true);
    console.log('Start Index:', startIndex);
    console.log('Next Value:', nextValue);
    console.log('All Next Values:', nextValues);
  }
} else {
  console.log('Exists:', false);
}