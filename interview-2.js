// [
//   { employeeCode: 20, managerCode: 30 },
//   { employeeCode: 30, managerCode: 40 },
//   { employeeCode: 40 },
//   { employeeCode: 50, managerCode: 40 },
// ]
// function getEmployeesOfManager(managerCode) {
//   // write your code here
// }
// function getManagerChainOfEmployee(employeeCode) {
//   // write your code here
// }

const { randomInt, randomBytes } = require('crypto');

let bookings = [
  { roomNo: 1, bookingStartDate: '2022-04-24', bookingEndDate: '2022-04-27' },
  { roomNo: 2, bookingStartDate: '2022-04-23', bookingEndDate: '2022-04-30' },
  { roomNo: 1, bookingStartDate: '2022-04-29', bookingEndDate: '2022-04-30' },
]
function isRoomAvailable(bookings, custStartDate, custEndDate, noOfRooms) {

  const total = [];

  total.push([new Date(custStartDate).getTime(), 1]);
  total.push([new Date(custEndDate).getTime(), 0]);

  for (const booking of bookings) {

    total.push([new Date(booking.bookingStartDate).getTime(), 1]);
    total.push([new Date(booking.bookingEndDate).getTime(), 0]);

  }

  total.sort((a, b) => a[0] - b[0]);

  for (const booking of total) {

    if (booking[1] === 1) {

      noOfRooms--;

    } else {

      noOfRooms++;

    }

    if (noOfRooms === 0) {

      return false;

    }

  }

  return true;

}

console.log(isRoomAvailable(bookings, '2022-04-28', '2022-04-29', 3));

const bucket1 = [];
const bucket2 = [];

newFunction(100);
addSynchDelay();
newFunction(400);
newFunction(10);
addSynchDelay();
newFunction(50);
addSynchDelay();
newFunction(1000);
addSynchDelay();
newFunction(15);
newFunction(150);
newFunction(150000);
addSynchDelay();
newFunction(15000);

const total = bucket2.length + bucket1.length;
console.log('Bucket1:', bucket1.length / total);
console.log('Bucket2:', bucket2.length / total);

function addSynchDelay() {

  // return;
  const start = Date.now();
  while (Date.now() - start < 200) {
    // do nothing
  }

}
function newFunction(limit = 100) {
  for (let i = 0; i < limit; i++) {
    // if (randomInt(0, 10) < 7) {
    if(getRandomNumberFromRandomBytes() < 181) {
      bucket1.push(i);
    } else {
      bucket2.push(i);
    }
  }
}

function getRandomNumberFromRandomBytes() {
  return randomBytes(1).readUInt8(0);
}
