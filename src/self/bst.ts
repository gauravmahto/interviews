class TreeNode<T> {

  public get right() {
    return this._right;
  }
  public set right(value) {
    this._right = value;
  }

  public get left() {
    return this._left;
  }
  public set left(value) {
    this._left = value;
  }

  public get value() {
    return this._value;
  }
  public set value(value) {
    this._value = value;
  }

  public constructor(private _value: TreeNode<T>, private _left: TreeNode<T> | null = null, private _right: TreeNode<T> | null = null) {
  }

}

class BinarySearchTree<T> {

  private root: TreeNode<T> | null = null;

  public constructor() {
  }

  public isEmpty() {

    return (this.root === null);

  }

  public insert(value) {

    const node = new TreeNode(value);

    if (this.isEmpty()) {

      this.root = node;

    } else {

      this.insertNode(this.root!, node);

    }

  }

  public traverse() {

    if (this.isEmpty()) {

      return;

    }

    this.traverseNode(this.root!);

  }

  public toString() {

    // return this.traverseNode(this.root) ?? '';

  }

  public get [Symbol.toStringTag]() {

    return this.toString();

  }

  public *[Symbol.iterator](node: TreeNode<T>) {

    if (this.isEmpty()) {

      return;

    }

    if (typeof node === 'undefined') {

      node = this.root!;

    }

    if (node.left !== null) {

      yield* this[Symbol.iterator](node.left!);

    }

    yield node.value;

    if (node.right !== null) {

      yield* this[Symbol.iterator](node.right!);

    }

  }

  private insertNode(root: TreeNode<T>, node: TreeNode<T>) {

    if (root.value > node.value) {

      if (root.left === null) {

        root.left = node;

      } else {

        this.insertNode(root.left, node);

      }

    } else {

      if (root.right === null) {

        root.right = node;

      } else {

        this.insertNode(root.right, node);

      }

    }

  }

  private traverseNode(node: TreeNode<T>) {

    if (node.left !== null) {

      this.traverseNode(node.left);

    }

    console.log(node.value);

    if (node.right !== null) {

      this.traverseNode(node.right);

    }

  }

}

const bst = new BinarySearchTree();

bst.insert(20);
bst.insert(10);
bst.insert(5);
bst.insert(30);
bst.insert(40);
bst.insert(23);

for (const item of bst) {

  console.log(item);

}

// console.log(bst.traverse());
