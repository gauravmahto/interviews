function strStr(haystack, needle) {
  let count = 0;
  let needleLen = needle.length;
  for (let index = 0; index < haystack.length; index++) {

    if (haystack[index] !== needle[count]) {
      count = 0;
    }

    if (haystack[index] === needle[count]) {
      count++;
    }

    if (count === needleLen) {
      return index - count + 1;
    }
  }

  return -1;
}

console.log(strStr('Helello', 'llw'))
// console.log(strStr('Helello', 'llo'))
// console.log(strStr('Helello', 'ele'))
// console.log(strStr('Helello', 'elo'))
// console.log(strStr('Helello', 'lo'))
