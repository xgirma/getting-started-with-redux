import incrementCounter from './08.incrementCounter';

describe('mutable', () => {
  it('should mutate', () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 11, 20];

    expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
    expect(listBefore).toEqual(listAfter);
  });
});