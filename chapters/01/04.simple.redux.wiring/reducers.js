function reducers (state=getInitialState(), action){
  if(action.type === INCREMENT){
    return { ...state, count: state.count + 1 }
  }

  if(action.type === DECREMENT){
    return { ...state, count: state.count - 1 }
  }

  return state;
}
