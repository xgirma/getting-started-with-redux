# 17. React Todo List Example (Adding a Todo)

[16. Implementing combineReducers() from Scratch](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/16)

Learn how to create a React todo list application using the reducers we wrote before.

Similar to the react counter-example from the eighth lesson, I declare a _render_ function that is going to update dom in response to the current application state. I'm going to subscribe to these core changes and call render to (1) render the initial state and (2) whenever the store changes.

```html
  <script type="text/jsx" src="script.jsx">
    const store = Redux.createStore(todoAppReducer);
    
    const render = () => {

    };

    store.subscribe(render);
    render(); // initial render

  </script>
```

Let us add redux-devtool for testing.

```html
  <script type="text/jsx" data-presets="es2015,react">
    const middleware = [];
    const enhancers = [];
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
    const store = Redux.createStore(
      todoAppReducer,
      composeEnhancers(Redux.applyMiddleware(...middleware), ...enhancers)
    );


    const render = () => {

    };

    store.subscribe(render);
    render();

  </script>
```

Let us create `TodoApp` component

```javascript
let nextTodoId = 0;

class TodoApp extends React.Component {
  render() {
    return (
      <div>
        <button 
          onClick={() => {store.dispatch({ type: 'ADD_TODO', text: 'Test', id: nextTodoId++ })}}>
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
```

Pass `todos` from the store to the `TodosApp`

```diff
<script type="text/jsx" data-presets="es2015,react">
    const middleware = [];
    const enhancers = [];
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
    const store = Redux.createStore(
      todoAppReducer,
      composeEnhancers(Redux.applyMiddleware(...middleware), ...enhancers)
    );


    const render = () => {
+      ReactDOM.render(<TodoApp todos={store.getState().todos}/>, document.getElementById('root'));
    };

    store.subscribe(render);
    render();

  </script>
```

I'm going to add an input inside my render function, and I'm using the `react callback ref API` where **ref is a function, it gets the node corresponding to the ref**, and I'm saving that node with some _name_. In this case, _this.input_.

```diff
let nextTodoId = 0;

class TodoApp extends React.Component {
  render() {
    return (
      <div>
+        <input ref={node => {this.girma = node }}/>
        <button
          onClick={() => {
-            store.dispatch({ type: 'ADD_TODO', text: 'Test', id: nextTodoId++ })
+            store.dispatch({ type: 'ADD_TODO', text: this.girma.value, id: nextTodoId++ })
+            this.girma.value = '';
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
```

(1) It is common for react components to `dispatch actions` in Redux apps. (2) However, it is equally important `to be able to render` **the current state**. My `TodoApp` component assumes that it's going to `receive todos as a prop`, and it maps over the todo list to display a list of them using the `todo.id` as a `key`.

```html
<ul>
  {this.props.todos.map(todo =>
    <li key={todo.id}>
      {todo.text}
    </li>)
  }
</ul>
```

The **render function is called on every store change** so the **todos prop is always up-to-date**. This was the rendering part of the redux flow.

```javascript
const render = () => {
  ReactDOM.render(<TodoApp todos={store.getState().todos}/>, document.getElementById('root'));
};
```

## Let's recap how mutations work in Redux.

[1] Any `state change is caused` by a **store.dispatch** call _somewhere in the component_. When an action is dispatched, `the store calls the reducer it was created with`, with the (1) current state and (2) the action being dispatched.

        1. store.dispatch anaction from a component
        2. store calls reducer with current state and the action
        
```javascript
<button
  onClick={() => {
    store.dispatch({ type: 'ADD_TODO', text: this.girma.value, id: nextTodoId++ });
    this.girma.value = '';
  }}>
  Add Todo
</button>
```

In our case, this is the `todoAppReducer` reducer, which we obtained by combining `visibilityFilter` and the todos `reducer`.

[2] It matches the action type and the switch statement. If the action type is `ADD_TODO` and indeed, it is equal to `ADD_TODO` string. In this case, it will call the child `todo` reducer, passing it **undefined**, because this is no state for a new todo that it can pass in the `action`.

```javascript
case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
```

We have a similar switch statement inside the todo reducer and the action type is ADD_TODO returns the initial state of the todo. With the id and text from the action and the completed field set to false.

```javascript
case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
```

The `todos` reducer that called it was returned a new array with all existent items and the new item added at the very end. It adds a need to do to the current state.

[3] Finally, the combined producer called `todoAppReducer` will use this new array as the new value for the todos field in the global state object. It's going to return a new state object where the todos field corresponds to the array with the newly-added todo item.

[4] The **render function is subscribed to the store changes** so it is `called again`, and it gets the fresh state by call and `getState` and it `passes the fresh todos` to the component, `re-rendering` it with the new data.

```javascript
const render = () => {
  ReactDOM.render(<TodoApp todos={store.getState().todos}/>, document.getElementById('root'));
};

store.subscribe(render);
render();
```








[18. React Todo List Example (Filtering a Todo)](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/18)