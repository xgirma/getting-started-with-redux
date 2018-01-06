let nextTodoId = 0;

class TodoApp extends React.Component {
  render() {
    return (
      <div>
        <input ref={node => {this.girma = node }}/>
        <button
          onClick={() => {
            store.dispatch({ type: 'ADD_TODO', text: this.girma.value, id: nextTodoId++ });
            this.girma.value = '';
          }}>
          Add Todo
        </button>
        <ul>
          {this.props.todos.map(todo =>
            <li key={todo.id}>
              {todo.text}
            </li>)
          }
        </ul>
      </div>
    );
  }
}