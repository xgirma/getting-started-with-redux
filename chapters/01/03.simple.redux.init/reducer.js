function reducer (state=getInitialState(), action){
  if(action.type === INCREMENT){
    return { ...state, count: action.count + 1 }
  }

  if(action.type === DECREMENT){
    return { ...state, count: action.count - 1 }
  }

  return state;
}