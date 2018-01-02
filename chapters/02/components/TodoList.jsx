const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo =>
      <Todo {...todo}
            key={todo.id}
            onClick={() => onTodoClick(todo.id)} />
    )}
  </ul>
);