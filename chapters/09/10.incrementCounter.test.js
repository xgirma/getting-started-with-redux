import deepFreeze from 'deep-freeze';
import incrementCounter from './11.incrementCounter';

describe('immutable', () => {
  it('should not mutate, with slice', () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 11, 20];

    deepFreeze(listBefore);

    expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
    expect(listBefore).not.toEqual(listAfter);
  });
});