import assert from 'assert'; 
import { describe, test, mock } from 'node:test';

import { PinkyPromise2 as PinkyPromise } from './promise.js';

describe('PinkyPromise', () => {
  test('basic functionality', () => {
    test('should create a PinkyPromise instance', () => {
      assert.ok(new PinkyPromise(() => {}) instanceof PinkyPromise);
    });

    test('should accept an executor function', () => {
      const executor = mock.fn(() => {}); 
      new PinkyPromise(executor);
      assert.strictEqual(executor.mock.calls.length, 1);
    });

    test('should have then and catch methods', () => {
      const promise = new PinkyPromise(() => {});
      assert.ok(typeof promise.then === 'function');
      assert.ok(typeof promise.catch === 'function');
    });
  });

  // describe('resolution', () => {
  //   test('should resolve a promise', () => {
  //     const value = 'resolved value';
  //     let resolvedValue;
  //     const promise = new PinkyPromise((resolve) => resolve(value));
  //     promise.then((val) => (resolvedValue = val));

  //     // Simulate asynchronous behavior (if applicable)
  //     setImmediate(() => {
  //       assert.strictEqual(resolvedValue, value);
  //     });
  //   });

  //   test('should call then with resolved value', (done) => {
  //     const value = 'resolved value';
  //     const promise = new PinkyPromise((resolve) => resolve(value));
  //     promise.then((resolvedValue) => {
  //       assert.strictEqual(resolvedValue, value);
  //       done();
  //     });
  //   });

  //   test('should call subsequent thens with resolved value', (done) => {
  //     const value = 'resolved value';
  //     const promise = new PinkyPromise((resolve) => resolve(value));
  //     promise
  //       .then((resolvedValue) => resolvedValue * 2)
  //       .then((secondResolvedValue) => {
  //         assert.strictEqual(resolvedValue, value);
  //         assert.strictEqual(secondResolvedValue, value * 2);
  //         done();
  //       });
  //   });
  // });

  // describe('rejection', () => {
  //   test('should reject a promise', () => {
  //     const reason = new Error('rejected');
  //     let rejectionReason;
  //     const promise = new PinkyPromise((_, reject) => reject(reason));
  //     promise.catch((val) => (rejectionReason = val));

  //     // Simulate asynchronous behavior (if applicable)
  //     setImmediate(() => {
  //       assert.strictEqual(rejectionReason, reason);
  //     });
  //   });

  //   test('should call catch with rejection reason', (done) => {
  //     const reason = new Error('rejected');
  //     const promise = new PinkyPromise((_, reject) => reject(reason));
  //     promise.catch((rejectionReason) => {
  //       assert.strictEqual(rejectionReason, reason);
  //       done();
  //     });
  //   });

  //   test('should call subsequent catches with rejection reason', (done) => {
  //     const reason = new Error('rejected');
  //     const promise = new PinkyPromise((_, reject) => reject(reason));
  //     promise
  //       .catch((rejectionReason) => rejectionReason)
  //       .catch((secondRejectionReason) => {
  //         assert.strictEqual(rejectionReason, reason);
  //         assert.strictEqual(secondRejectionReason, reason);
  //         done();
  //       });
  //   });
  // });

  // Add more test cases for chaining, error handling, etc.
});
