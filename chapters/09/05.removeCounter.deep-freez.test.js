import deepFreeze from 'deep-freeze'
import removeCounter from './05.removeCounter';

describe('mutable', () => {
  xit('should mutate, with splice', () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 20];

    deepFreeze(listBefore);

    expect(removeCounter(listBefore, 1)).toEqual(listAfter);
    expect(listBefore).toEqual(listAfter);
  });
});
