import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';

import { Stack } from './stack';

describe('Stack', () => {

  it('Is able to crate stack object', () => {

    const stack = new Stack();

    strictEqual(stack instanceof Stack, true);

  });

  it('Is able to push and pop', () => {

    const stack = new Stack();

    stack.push(1);
    stack.push(2);

    strictEqual(stack.pop(), 2);
    strictEqual(stack.pop(), 1);
    strictEqual(stack.pop(), void 0);

  });

});
