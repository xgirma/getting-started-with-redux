let nextTodoId = 0;

const getVisibleTodos = (todos, filter) => {
  console.log(todos, filter.filter);
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
  }
};

class TodoApp extends React.Component {
  render() {
    const { todos, visibilityFilter } = this.props;
    const visibleTodos = getVisibleTodos( todos, visibilityFilter );

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

        <TodoList todos={visibleTodos}
                  onTodoClick={ id =>
                    store.dispatch({
                      type: 'TOGGLE_TODO',
                      id
                    })
                  } />

        <p>
          Show:{' ['}
          <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter}> All </FilterLink>{']  ['}
          <FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter}> Active </FilterLink>{']  ['}
          <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter}> Completed </FilterLink>{']'}
        </p>
      </div>
    );
  }
}

