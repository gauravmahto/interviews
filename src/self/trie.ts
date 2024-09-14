class TrieNode {

  public children: Map<string, TrieNode>;
  public isEndOfWord: boolean;

  public constructor() {

    this.children = new Map();
    this.isEndOfWord = false;

  }

}

export class Trie {

  private root: TrieNode;

  public constructor() {

    this.root = new TrieNode();

  }

  public insert(word: string) {

    let node = this.root;

    for (const char of word) {

      const child = node.children.get(char);

      if (!child) {

        const newChild = new TrieNode();

        node.children.set(char, newChild);
        node = newChild;

      } else {

        node = child;

      }

    }

    node.isEndOfWord = true;

  }

  public search(word: string): boolean {

    let node = this.root;

    for (const char of word) {

      const child = node.children.get(char);

      if (!child) {

        return false;

      }

      node = child;

    }

    return node.isEndOfWord;

  }

  public startsWith(prefix: string): boolean {

    let node = this.root;

    for (const char of prefix) {

      const child = node.children.get(char);

      if (!child) {

        return false;

      }

      node = child;

    }

    return true;

  }

}
