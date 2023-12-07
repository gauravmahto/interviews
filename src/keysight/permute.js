// string as input - abc
// output - abc - p&c
// eg - abc, acb, bca, bac, cab, cba

// function permute(str) {

//   const result = new Set();

//   for (let index = 0; index < str.length; index++) {

//     let value = '';

//     for (let innerIndex = index; value.length < str.length; innerIndex++) {

//       value += str[innerIndex % str.length];

//     }

//     result.add(value);

//     let otherValue = value[0];
//     otherValue += value[2];
//     otherValue += value[1];

//     result.add(otherValue);

//     value = '';

//   }

//   return result;

// }


function permute(str) {

  const result = [];

  if (str.length === 0) {

    result.push('');

  }

  for (let index = 0; index < str.length; index++) {

    const remainingChars = str.slice(0, index) + str.slice(index + 1);

    const permutations = permute(remainingChars);

    for (const permutation of permutations) {

      result.push(str[index] + permutation);

    }

  }

  return result;

}

console.log(permute('abc'));
