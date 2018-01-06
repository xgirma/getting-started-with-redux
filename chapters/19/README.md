# 19. React Todo List Example (Filtering Todos)

[<<< 18. React Todo List Example (Toggling a Todo)](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/18)

In this lesson, we're going to dispatch _SET_VISIBILITY_FILTER_ reaction and use the **visibilityFilter** field to only show the todos the user wants to see -- either the `completed todos, active todos, or all todos` in the current state.

I'm starting by creating a new functional component called, **FilterLink** that the user needs to click to switch the current visible todos. The **FilterLink** accepts the **filter prop**, which is just a string, and **the children**, which is the `contents of the link.` It's going to be a simple <a> tag that doesn't really link anywhere. It's going to `prevent the navigation when clicked`.

```javascript
const FilterLink = ({filter, children}) => {
  return (
    <a href='#'
       onClick={ event => {
         event.preventDefault();
         store.dispatch({
           type: 'SET_VISIBILITY_FILTER',
           filter
         })
       }}
    >
      {children}
    </a>
  )
};
```

It's going to dispatch an action, the type, SET_VISIBILITY_FILTER, and pass in the filter prop so that the reducer knows which filter is being clicked. I will pass the children down to the <a> tag, so the consumer can specify the text of the link. **Now I can use it in my TodoApp component**.

I am creating a new function that is going to help me filter the todos according to the filter value. It's called, **getVisibleTodos**. It accepts two arguments, the todos and the filter. It switches on the current filter value.

```javascript
const getVisibleTodos = (todos, filter) => {
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
```

**Now I need to call getVisibleTodos to filter the todos before rendering them**. **In the render function of the TodoApp** component, I get the visible todos by calling getVisibleTodos with the todos and the visibilityFilter values from my props.

I'm going to use the **visibleTodos** instead of **this.props.todos** when I enumerate them for rendering.

```diff
let nextTodoId = 0;

class TodoApp extends React.Component {
  render() {
+    const visibleTodos = getVisibleTodos(
+      this.props.todos,
+      this.props.visibilityFilter
+    );

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
-          {this.props.todos.map(todo =>
+          {visibleTodos.map(todo =>
            <li
              key={todo.id}
              onClick={() => {
                store.dispatch({
                  type: 'TOGGLE_TODO',
                  id: todo.id
                })
              }}
              style={{textDecoration: todo.completed? 'line-through': 'none'}}
            >
              {todo.text}
            </li>)
          }
        </ul>

+        <p>
+          Show:{' '}
+          <FilterLink filter='SHOW_ALL'>{' '} All </FilterLink>
+          <FilterLink filter='SHOW_ACTIVE'>{' '} Active </FilterLink>
+          <FilterLink filter='SHOW_ACTIVE'> Completed </FilterLink>
+        </p>
      </div>
    );
  }
}
```
Finally, I now use the **visibilityFilter** inside my TodoApp component, so I need to pass it as a prop.

I could do this `explicitly`, but actually it's easier for me just to **spread** over all the state fields. So every state field inside the state object is passed as a prop to the TodoApp component. This way, it receives the visibilityFilter. If I add some todo items and then click on them, so I change their completed fields, and then click on the visibilityFilter links, the currently visible todos are rendered according to the chosen visibilityFilter.

```diff
const render = () => {
-  ReactDOM.render(<TodoApp todos={store.getState().todos}/>, document.getElementById('root'));
+  ReactDOM.render(<TodoApp {...store.getState()}/>, document.getElementById('root'));
};

store.subscribe(render);
render();
```

The links look all the same right now, but we want to highlight the chosen one. To implement this, we're going to need the visibilityFilter prop which says which is the current one.

<img width="320" alt="screen shot 2018-01-06 at 7 26 23 am" src="https://user-images.githubusercontent.com/5876481/34641056-f6f09aa8-f2b2-11e7-9475-a090807c19d9.png">

I'm changing the beginning of the render method to destructure the todos and the visibilityFilter from the props, so I can access them directly now without typing this.props every time.

I'm going to pass the visibilityFilter to every <FilterLink>, so it can know which filter is the current one and apply different styling if the currentFilter matches the filter links' own filter.

```diff
let nextTodoId = 0;

class TodoApp extends React.Component {
  render() {
+    const { todos, visibilityFilter } = this.props;
-    const visibleTodos = getVisibleTodos(
-      this.props.todos,
-      this.props.visibilityFilter
-    );
+    const visibleTodos = getVisibleTodos( todos, visibilityFilter );

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
          {visibleTodos.map(todo =>
            <li
              key={todo.id}
              onClick={() => {
                store.dispatch({
                  type: 'TOGGLE_TODO',
                  id: todo.id
                })
              }}
              style={{textDecoration: todo.completed? 'line-through': 'none'}}
            >
              {todo.text}
            </li>)
          }
        </ul>

        <p>
          Show:{' '}
+          <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter}> All </FilterLink>{'  '}
+          <FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter}> Active </FilterLink>{'  '}
+          <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter}> Completed </FilterLink>
        </p>
      </div>
    );
  }
}
```

After passing the currentFilter prop to every filter link, I go back to the FilterLink declaration. I'm adding currentFilter as a prop to it, and I'm adding a condition that says that when the filter is the currentFilter, that is, when the link is active, I want to return a <span> instead of a link because I don't want it to be clickable. I want it to be static text.

```diff
const FilterLink = ({filter, children}) => {
+  if(filter === currentFilter) {
+    return <span>{children}</span>
+  }
  return (
    <a href='#'
       onClick={ event => {
         event.preventDefault();
         store.dispatch({
           type: 'SET_VISIBILITY_FILTER',
           filter
         })
       }}
    >
      {children}
    </a>
  )
};
```

[>>> 20. Extracting Presentational Component (Todo, TodoList)](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/20)