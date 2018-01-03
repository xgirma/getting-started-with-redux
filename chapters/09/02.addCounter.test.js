import deepFreeze from 'deep-freeze';
import addCounter from './02.addCounter';

describe('mutable', () => {
  xit('should not mutate, with deep-freeze + concat', () => {
    const listBefore = [];
    const listAfter = [0];

    deepFreeze(listBefore);

    expect(addCounter(listBefore)).toEqual(listAfter);
  });
});