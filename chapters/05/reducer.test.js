import counter  from './reducer';

describe('counter reducer', ()=> {
  it('increment', () => {
    expect(counter(0, {type: 'INCREMENT'})).toEqual(1);
  });

  it('increment', () => {
    expect(counter(1, {type: 'INCREMENT'})).toEqual(2);
  });

  it('decrement', () => {
    expect(counter(2, {type: 'DECREMENT'})).toEqual(1);
  });

  it('decrement', () => {
    expect(counter(1, {type: 'DECREMENT'})).toEqual(0);
  });

  it('unknown action', () => {
    expect(counter(1, {type: 'SOMETHING_ELSE'})).toEqual(1);
  });

  it('undefined state, {} action', () => {
    expect(counter(undefined, {})).toEqual(0);
  });
});