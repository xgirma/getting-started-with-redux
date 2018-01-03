import deepFreeze from 'deep-freeze';
import addCounter from './04.addCounter';

describe('mutable', () => {
  it('should not mutate, with deep-freeze + array spread', () => {
    const listBefore = [];
    const listAfter = [0];

    deepFreeze(listBefore);

    expect(addCounter(listBefore)).toEqual(listAfter);
  });
});