import deepFreeze from 'deep-freeze';
import removeCounter from './06.removeCounter';

describe('immutable', () => {
  it('should not mutate, with slice', () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 20];

    deepFreeze(listBefore);

    expect(removeCounter(listBefore, 1)).toEqual(listAfter);
    expect(listBefore).not.toEqual(listAfter);
  });
});