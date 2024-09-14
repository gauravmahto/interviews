export class PinkyPromise {

  #validStates = {

    pending: 0x001,
    fulfilled: 0x010,
    rejected: 0x100

  };

  #state = this.#validStates.pending;
  #value = void 0;

  #onFulfilledCallbacks = [];
  #onRejectedCallbacks = [];

  constructor(executor) {

    if (typeof executor !== 'function') {

      throw new TypeError('Executor must be a function');

    }

    try {

      executor((value) => this.#resolve(value), (reason) => this.#reject(reason));

    } catch (error) {

      this.#reject(error);

    }

  }

  then(onFulfilled, onRejected) {

    // onFulfilled, onRejected must be called as late as possible in async way after the event loop. Also, must be called as functions without 'this' context
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => {

      throw reason;

    };

    return new PinkyPromise((resolve, reject) => {

      const resolvedWrapper = (value) => {

        queueMicrotask(() => {

          try {

            const result = onFulfilled(value);

            if (result instanceof PinkyPromise) {

              result.then(resolve, reject);

            } else {

              resolve(result);

            }

          } catch (error) {

            reject(error);

          }

        });

      };

      const rejectWrapper = (reason) => {

        queueMicrotask(() => {

          try {

            const result = onRejected(reason);

            if (result instanceof PinkyPromise) {

              result.then(resolve, reject);

            } else {

              resolve(result);

            }

          } catch (error) {

            reject(error);

          }

        });

      };


      if (this.#fulfilled) {

        resolvedWrapper(this.#value);

      } else if (this.#rejected) {

        rejectWrapper(this.#value);

      } else {

        this.#onFulfilledCallbacks.push(resolvedWrapper);
        this.#onRejectedCallbacks.push(rejectWrapper);

      }

    });

  }

  catch(onRejected) {

    return this.then(null, onRejected);

  }

  get [Symbol.toStringTag]() {

    return `${this.#pending ? 'Pending' : this.#fulfilled ? 'Resolved' : 'Rejected'}`;

  }

  [Symbol.toPrimitive](hint) {

    switch (hint) {

      case 'number':
        return 0;

      case 'string':
      case 'default':
        return this[Symbol.toStringTag];

    }

    return new TypeError(`${this[Symbol.toStringTag]} Invalid to Primitive conversion`);

  }

  valueOf() {

    return this[Symbol.toStringTag];

  }

  toString() {

    return `[Object ${this[Symbol.toStringTag]}]`;

  }

  #resolve(value) {

    if (this.#pending) {

      if (value === this) {

        const circularPromiseError = new TypeError('Chaining cycle detected for promise');

        return this.#reject(circularPromiseError);

      }

      if (value instanceof PinkyPromise) {

        value.then((value) => this.#resolve(value), (reason) => this.#reject(reason));

        return;

      }

      this.#state = this.#validStates.fulfilled;
      this.#value = value;

      queueMicrotask(() => this.#executeCallbacks(this.#onFulfilledCallbacks));

    }

  }

  #reject(reason) {

    if (this.#pending) {

      this.#state = this.#validStates.rejected;
      this.#value = reason;

      queueMicrotask(() => this.#executeCallbacks(this.#onRejectedCallbacks));

    }

  }

  #executeCallbacks(callbacks) {

    for (const callback of callbacks) {

      if (typeof callback === 'function') {

        callback(this.#value);

      }

    }

  };

  get #pending() {

    return Boolean(this.#state & this.#validStates.pending);

  }

  get #fulfilled() {

    return Boolean(this.#state & this.#validStates.fulfilled);

  }

  get #rejected() {

    return Boolean(this.#state & this.#validStates.rejected);

  }

}

// --------------------------------------------------------------------------------------

export class PinkyPromise2 {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('Executor must be a function');
    }

    this.state = 'pending';
    this.value = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        if (value === this) {
          const circularPromiseError = new TypeError('Chaining cycle detected for promise');
          return reject(circularPromiseError);
        }

        if (value instanceof PinkyPromise2) {
          value.then(resolve, reject);
          return;
        }

        this.state = 'fulfilled';
        this.value = value;
        this._executeCallbacks(this.onFulfilledCallbacks);
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.value = reason;
        this._executeCallbacks(this.onRejectedCallbacks);
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason; };

    return new PinkyPromise2((resolve, reject) => {
      const onFulfilledWrapper = (value) => {
        queueMicrotask(() => {
          try {
            const result = onFulfilled(value);
            if (result instanceof PinkyPromise2) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        });
      };

      const onRejectedWrapper = (reason) => {
        queueMicrotask(() => {
          try {
            const result = onRejected(reason);
            if (result instanceof PinkyPromise2) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        });
      };

      if (this.state === 'fulfilled') {
        onFulfilledWrapper(this.value);
      } else if (this.state === 'rejected') {
        onRejectedWrapper(this.value);
      } else {
        this.onFulfilledCallbacks.push(onFulfilledWrapper);
        this.onRejectedCallbacks.push(onRejectedWrapper);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  _executeCallbacks(callbacks) {
    for (const callback of callbacks) {
      callback(this.value);
    }
  }
}

// --------------------------------------------------------------------------------------

((MyPromise) => {

  console.log('First');

  const bPromise = new MyPromise((res, rej) => {

    console.log('inside First');

    // throw 'err';

    return new MyPromise((res) => {

      setTimeout(() => {

        console.log('Inside first inner promise');

        res(1);

      }, 1000);

    }).then(() => {

      (console.log('Inside first inner chained promise'));

      res(2);
      // rej('Original error');

    });

  })

    // const bPromise = new MyPromise(async (res, rej) => {

    //   console.log('Inside first');

    //   await new MyPromise(res => setTimeout(res, 1000));

    //   // throw Error('WTF');
    //   // return rej('ok error')

    //   console.log('Inside last');

    //   res();

    // })
    .then((val) => {
      console.log(`Somewhat later - first chained promise - ${val}`);
    })
    .then((val) => {
      console.log(`Somewhat later - second chained promise - ${val}`);
    })
    .catch((err) => {
      console.error(`The error ${err}`);
      return new MyPromise(res => res('From first catch chained - a new promise'));
    })
    .then((val) => {
      console.log(`After catch then ${val}`);
      return new MyPromise(res => res('After catch - first chained then - new promise'));
    })
    .catch((err) => {
      console.error(`Second chained catch - The error 2 ${err} - The same error will be passed to next chained link`);
      return err;
    })
    .then((val) => {
      console.log(`Last chained then - After second catch then ${val}`);
    });

  console.log(bPromise);

  const checkLastState = new MyPromise(res => res(bPromise))
    .then(() => console.log(bPromise));

})(PinkyPromise);
