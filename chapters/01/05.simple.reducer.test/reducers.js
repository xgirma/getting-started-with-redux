import initialState  from './initial.state';
import { INCREMENT, DECREMENT } from './constants'

function Reducers (state=initialState(), action){
  if(action.type === INCREMENT){
    return { ...state, count: state.count + 1 }
  }

  if(action.type === DECREMENT){
    return { ...state, count: state.count - 1 }
  }

  return state;
}

export default Reducers;
