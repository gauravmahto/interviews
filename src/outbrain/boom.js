// The function will print each of the numbers from 1 till n 
// numbers that are a multiply of seven print BOOM will be printed instead
// numbers that consists of the digit seven print BOOM will be printed instead


// Example:
// 1 2 3 4 5 6 BOOM 8 9 10 11 12 13 BOOM 15

function isSevenPresent(num) {

  while (num > 0) {

    const digit = num % 10;

    if (digit === 7) {

      return true;

    }

    num = Math.floor(num / 10);

  }

  return false;

}

async function sevenBoom(n) {

  for (let num = 1; num <= n; num++) {

    if (num % 7 === 0 || isSevenPresent(num)) {

      console.log('BOOM');

    } else {

      console.log(num);

    }

    await new Promise(res => setTimeout(res, 500));

  }

}

sevenBoom(15);
// (async () => {
  
//   await sevenBoom(15);

// })();
