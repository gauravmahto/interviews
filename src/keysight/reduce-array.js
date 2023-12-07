/**
 * Given an array of integers, a, in one operation one can select any two adjacent elements and replace them with their product. This operation can only be applied if the product of those adjacent elements is less than or equal to k.

 * The goal is to reduce the length of the array as much as possible by performing any number of operations. Return that minimum size.

 * Example

 * Let array a = [2, 3, 3, 7, 3, 5] and k = 20

 * This is the list of operations that will give us the smallest array (1-based indexing):

 * • Merge the elements at indices (1, 2), resulting array will be - [6, 3,7,3,5]

 * • Merge the elements at indices (1, 2), resulting array will be - [18, 7, 3, 5]

 * • Merge the elements at indices (3, 4), resulting array will be - [18, 7, 15]

 * Hence, the answer is 3.

 * Function Description

 * Complete the function getMinLength in the editor below.

 * getMinLength has the following parameters:

 * int a[n]: an array of integers

 * int k: the constraint of the operation

 * Returns

 * int: the minimum length of the array after performing any number of operations

 */

// import { writeFileSync } from 'fs';

import hugeArr from './array.json' assert {type: 'json'};

// function getMinLength(a, k) {

//   let result = a.length;

//   for (let i = 0; i < a.length - 1; i++) {

//     let product = a[i] * a[i + 1];

//     while (product <= k) {

//       a.splice(i, 2, product);
//       result--;

//       if (i > 0) {
//         i--;
//         product = a[i] * a[i + 1];
//       } else {
//         product = a[i] * a[i + 1];
//       }

//     }

//   }

//   return result;

// }

function getMinLength(a, k) {

  let result = a.length;

  for (let i = 0; i < a.length - 1; i++) {

    let product = a[i] * a[i + 1];

    while (i < a.length - 1 && product <= k) {

      a[i + 1] = product;
      result--;
      i++;
      product = a[i] * a[i + 1];

    }

  }

  return result;

}

// Example usage
let a = [2, 3, 3, 7, 3, 5];
let k = 20;

// const hugeArray = [];
// for (let i = 0; i < 2 * 1000 * 1000 * 3; i++) {

//   hugeArray.push(Math.ceil(Math.random() * 100));

// }
// writeFileSync('array.json', JSON.stringify(hugeArray));

const perf = performance.now();

process.on('SIGINT', function () {

  console.log('Caught interrupt signal');

  console.log(`Time: ${(performance.now() - perf) / 1000} sec`);

  process.exit(-1);

});

let minLength = getMinLength(hugeArr, k);

console.log(`Time: ${(performance.now() - perf) / 1000} sec`);

console.log(minLength);
