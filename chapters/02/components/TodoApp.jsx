let nextTodoId = 0;
const TodoApp = ({ dispatch, todos, visibilityFilter }) => {
  let visibleTodos = todos;

  switch (visibilityFilter) {
    case Filters.SHOW_COMPLETED:
      visibleTodos = todos.filter(todo => todo.completed);
      break;
    case Filters.SHOW_ACTIVE:
      visibleTodos = todos.filter(todo => !todo.completed);
      break;
  }

  return (
    <div>
      <AddTodo
        onAddClick={text =>
          dispatch({ type: ADD_TODO, text, id: nextTodoId++ })
        } />
      <TodoList
        todos={visibleTodos}
        onTodoClick={id =>
          dispatch({ type: TOGGLE_TODO, id })
        } />
      <Footer
        filter={visibilityFilter}
        onFilterChange={filter =>
          dispatch({ type: SET_VISIBILITY_FILTER, filter })
        } />
    </div>
  );
};