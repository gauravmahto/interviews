import { setTimeout } from 'node:timers/promises';

// using iterator and async
function getNumbers({ from = 0, to = 10, interval = 50 } = {}) {

  return {

    [Symbol.asyncIterator]() {

      return {

        current: from,
        last: to,

        async next() {

          await setTimeout(interval);

          if (this.current <= this.last) {

            return {
              done: false,
              value: this.current++
            };

          }

          return {
            done: true
          };

        }

      };

    }

  };

}

// using generator iterator and async
function getNumbersG({ from = 0, to = 10, interval = 50 } = {}) {

  return {

    async *[Symbol.asyncIterator]() {

      for (let value = from; value <= to; value++) {

        await setTimeout(interval);

        yield value;

      }

    }

  };

}

for await (const value of getNumbers()) {

  console.log(value);

}

for await (const value of getNumbersG()) {

  console.log(value);

}
