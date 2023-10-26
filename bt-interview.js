// Que: Create a function that returns which chapter is nearest to the page you're on. If two chapters are equidistant, return the chapter with the higher page number.

// nearestChapter({
//  "Chapter 1" : 1,
//  "Chapter 2" : 15,
//  "Chapter 3" : 37
// }, 10) ➞ "Chapter 2"


// nearestChapter({
//  "New Beginnings" : 1,
//  "Strange Developments" : 62,
//  "The End?" : 194,
//  "The True Ending" : 460
// }, 200) ➞ "The End?"


// nearestChapter({
//  "Chapter 1a" : 1,
//  "Chapter 1b" : 5
// }, 3) ➞ "Chapter 1b"

// fn nearestChapter

function nearestChapter(obj, currentPage) {

  let diff = Number.POSITIVE_INFINITY;
  let chapter = '';

  for (let key in obj) {

    const pageNo = obj[key];

    const currentDiff = Math.abs(pageNo - currentPage);

    if (currentDiff < diff || (
      (currentDiff === diff &&
        obj[key] > obj[chapter])
    )) {

      diff = currentDiff;
      chapter = key;

    }

  }

  return chapter;

}

console.log(nearestChapter({
  "New Beginnings": 1,
  "Strange Developments": 62,
  "The End?": 194,
  "The True Ending": 460
}, 200));

console.log(nearestChapter({
  "Chapter 1a": 1,
  "Chapter 1b": 5
}, 3));

console.log(nearestChapter({
  "Chapter 1": 1,
  "Chapter 2": 15,
  "Chapter 3": 37
}, 10));
