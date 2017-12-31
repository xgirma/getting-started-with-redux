function reducers (state=getInitialState(), action){
  if(action.type === INCREMENT){
    return { ...state, count: state.count + 1 }
  }

  if(action.type === DECREMENT){
    return { ...state, count: state.count - 1 }
  }

  return state;
}

const getInitialState = () => {
  return { count: 0 }
};

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

describe('reducers', () => {
  it('initial', () => {
    let state;
    state = reducers( undefined, {type:'INCREMENT'});
    expect(state).toEqual({count:1});
  });

  it('increment', () => {
    let state;
    state = reducers( {count:2}, {type:'INCREMENT'});
    expect(state).toEqual({count:3});
  });

  it('decrement', () => {
    let state;
    state = reducers( {count:2}, {type:'DECREMENT'});
    expect(state).toEqual({count:1});
  });
});