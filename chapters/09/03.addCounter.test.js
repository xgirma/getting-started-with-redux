import deepFreeze from 'deep-freeze';
import addCounter from './03.addCounter';

describe('immutable', () => {
  it('should not mutate, with deep-freeze + concat', () => {
    const listBefore = [];
    const listAfter = [0];

    deepFreeze(listBefore);

    expect(addCounter(listBefore)).toEqual(listAfter);
    expect(listBefore).not.toEqual(listAfter);
  });
});