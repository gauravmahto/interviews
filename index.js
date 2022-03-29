function strStr(haystack, needle) {
  let count = 0;
  let needleLen = needle.length;
  for (let index = 0; index < haystack.length; index++) {
    if (haystack[index] === needle[count]) {
      count++;
    } else {
      count = 0;
    }
    if (count === needleLen) {
      return index - count + 1;
    }
  }

  return -1;
}

console.log(strStr('Helello', 'llw'))
