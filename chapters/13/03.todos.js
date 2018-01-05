const todo = (state, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if(state.id !== action.id){
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };
    default:
        return state;
  }
};

const todos = (state =[], action) => {
  switch(action.type){
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
      return state.map(todo => {
        console.log('*** id: ', todo.id);
        if(todo.id !== action.id){
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed
        }
      });
    default:
      return state
  }
};

export default todos;