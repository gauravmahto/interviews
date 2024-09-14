import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';
import { performance } from 'perf_hooks';

import { Trie } from './trie';

// Function to generate random strings of a given length
const generateRandomString = (length: number): string => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Generate an array of random strings
const generateTestData = (num: number, strLength: number): string[] => {
  const data: string[] = [];
  for (let i = 0; i < num; i++) {
    data.push(generateRandomString(strLength));
  }
  return data;
};

describe('Trie Performance and Functionality Tests', () => {
  const testData = generateTestData(100000, 8); // Generate 100,000 random strings with length 8
  const trie = new Trie();

  it('should insert 100,000 strings efficiently', () => {
    const start = performance.now();
    for (const word of testData) {
      trie.insert(word);
    }
    const end = performance.now();
    console.log(`Insert 100,000 strings took ${(end - start).toFixed(2)} ms`);
  });

  it('should search for 100,000 words correctly', () => {
    const start = performance.now();
    for (const word of testData) {
      strictEqual(trie.search(word), true, `Word "${word}" should be found`);
    }
    const end = performance.now();
    console.log(`Search 100,000 words took ${(end - start).toFixed(2)} ms`);
  });

  it('should verify startsWith for 100,000 prefixes', () => {
    const start = performance.now();
    for (const word of testData) {
      strictEqual(trie.startsWith(word.slice(0, 3)), true, `Prefix "${word.slice(0, 3)}" should be found`);
    }
    const end = performance.now();
    console.log(`StartsWith 100,000 prefixes took ${(end - start).toFixed(2)} ms`);
  });
});
