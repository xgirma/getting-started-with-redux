import deepFreeze from 'deep-freeze';
import incrementCounter from './09.incrementCounter';

describe('mutable', () => {
  xit('should mutate', () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 11, 20];

    deepFreeze(listBefore);

    expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
  });
});