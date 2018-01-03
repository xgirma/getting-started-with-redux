import removeCounter from './05.removeCounter';

describe('mutable', () => {
  it('should mutate, with splice', () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 20];

    expect(removeCounter(listBefore, 1)).toEqual(listAfter);
    expect(listBefore).toEqual(listAfter);
  });
});