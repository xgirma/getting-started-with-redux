const todo = (state, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
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