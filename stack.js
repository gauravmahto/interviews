var LinkedListNode = /** @class */ (function () {
    function LinkedListNode(data) {
        this.data = data;
    }
    return LinkedListNode;
}());
var Stack = /** @class */ (function () {
    function Stack() {
    }
    Stack.prototype.push = function (item) {
        if (typeof this.head === 'undefined') {
            this.head = new LinkedListNode(item);
        }
        else {
            var head = this.head;
            this.head = new LinkedListNode(item);
            this.head.next = head;
        }
    };
    Stack.prototype.pop = function () {
        if (typeof this.head !== 'undefined') {
            var popped = this.head;
            this.head = popped.next;
            return popped.data;
        }
    };
    ;
    return Stack;
}());
var stack = new Stack();
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
