let nextTodoId = 0;
const {Component} = React;
const TodoApp = ({todos, visibilityFilter}) => (
  <div>
    <AddTodo
      onAddClick={text => store.dispatch({
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
      })}/>

    <TodoList todos={
      getVisibleTodos(todos, visibilityFilter)}
              onTodoClick={id =>
                store.dispatch({
                  type: 'TOGGLE_TODO',
                  id
                })}/>

    <FilterLink
      filter='SHOW_ALL'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    />

    <Footer
      visibilityFilter={visibilityFilter}
      onFilterClick={filter =>
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })}
    />
  </div>
);
