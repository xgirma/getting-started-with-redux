import addCounter from './01.addCounter';

describe('mutable', () => {
  it('should mutate', () => {
    const listBefore = [];
    const listAfter = [0];
    expect(addCounter(listBefore)).toEqual(listAfter);
  });
});