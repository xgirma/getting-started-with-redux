const todos = (state = [], action) => {
  if(action.type === ADD_TODO){
    return [...state, { text: action.text, id: action.id, completed: false }];
  }

  if(action.type === TOGGLE_TODO){
    return state.map(todo => todo.id === action.id?
      Object.assign({}, todo, {completed: !todo.completed}) : todo)
  }

  return state;
};