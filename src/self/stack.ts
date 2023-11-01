import { pathToFileURL } from 'url';

export class LinkedListNode<T> {

  public next: LinkedListNode<T>;

  public constructor(public data: T) {
  }

}

export class Stack<T> {

  private head: LinkedListNode<T>;

  public push(item: T): void {

    if (typeof this.head === 'undefined') {

      this.head = new LinkedListNode(item);

    } else {

      const head = this.head;

      this.head = new LinkedListNode(item);
      this.head.next = head;

    }

  }

  public pop(): T | undefined {

    if (typeof this.head !== 'undefined') {

      const popped = this.head;

      this.head = popped.next;

      return popped.data;

    }

  };

}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {

  const stack = new Stack<number>();

  stack.push(1);
  stack.push(2);
  stack.push(3);
  stack.push(4);
  console.log(stack.pop());
  stack.push(5);
  stack.push(6);
  console.log(stack.pop());
  console.log(stack.pop());
  console.log(stack.pop());
  console.log(stack.pop());
  console.log(stack.pop());
  console.log(stack.pop());
  stack.push(7);
  stack.push(8);
  console.log(stack.pop());
  console.log(stack.pop());
  console.log(stack.pop());

}
