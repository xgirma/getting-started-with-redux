import Reducers from './reducers';

describe('reducers', () => {
  it('initial', () => {
    let state;
    state = Reducers( undefined, {type:'INCREMENT'});
    expect(state).toEqual({count:1});
  });

  it('increment', () => {
    let state;
    state = Reducers( {count:2}, {type:'INCREMENT'});
    expect(state).toEqual({count:3});
  });

  it('decrement', () => {
    let state;
    state = Reducers( {count:2}, {type:'DECREMENT'});
    expect(state).toEqual({count:1});
  });
});