import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate a linked list from values 1', () => {
    const linkedList = {
      value: 1,
      next: {
        value: 1,
        next: {
          value: null,
          next: null,
        },
      },
    };

    expect(generateLinkedList([1, 1])).toStrictEqual(linkedList);
  });

  test('should generate a linked list from values 2', () => {
    const linkedList = {
      value: 2,
      next: {
        value: 2,
        next: {
          value: null,
          next: null,
        },
      },
    };

    expect(generateLinkedList([2, 2])).toMatchSnapshot(linkedList);
  });
});
