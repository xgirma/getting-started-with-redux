# 18. React Todo List Example (Toggling a Todo)

[<<< 17. React Todo List Example (Adding a Todo)](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/17)

To `add the todos`, we `dispatched the ADD_TODO action`. In this lesson, we're going to `dispatch the TOGGLE_TODO action` `to toggle` the completed state of the todos by clicking on them.

I'm scrolling down to my React component. I've got a `list item here corresponding to the todo`, so I'm **adding the onClick handler**.

The **event handler knows which todo it corresponds to**, so it is able to **pass its id in the action**.

```diff
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
            <li
              key={todo.id}
+              onClick={() => {
+                store.dispatch({
+                  type: 'TOGGLE_TODO',
+                  id: todo.id
+                })
              }}
            >
              {todo.text}
            </li>)
          }
        </ul>
      </div>
    );
  }
}
```

In the user interface, I want _the completed todos to appear crossed out_, so I'm adding this style attribute to the list item. I'm going to use the **textDecoration property**, which is going to be a line-through when todo.completed is true, and none when todo.completed is false, so I get a normal looking todo.

## Let's recap how toggling the todo actually works.

**[1]** It starts with me dispatching the **TOGGLE_TODO** action inside my `click handler`, `with a type TOGGLE_TODO and the id`, which is the id of the todo being rendered.

```javascript
onClick={() => {
  store.dispatch({type: 'TOGGLE_TODO', id: todo.id });
}}
```
I get the **todo object** as an argument to the array map call back inside my render method where I render all the todos.

**[2]** **When an action is dispatched, the store will call the root reducer**, which will call the `todos reducer` with the array of todos and the `action`. In this case, the `action type is TOGGLE_TODO`, so the todos reducer delegates handling of every todo to the todo reducer with a map function to call it for every todo item. The todos reducer receives the todo as state, and the action.

```javascript
case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
```
**[3]** Again, we switch on the action type, and it matches` TOGGLE_TODO` string. Now, for every todo whose id does not match the `id` specified in the action, we just return the previous state, that is the todo object, as it was.

```javascript
case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
```

**[4]** However, if the `id` of the todo matches the one specified in the action, we're going to return any object with all the properties of the original todo, but with the **completed** field equal to the opposite value of what it was.

The updated todo item will be included in the `todos` field under the new application state. Because we `subscribe`, the `render` function is going to get the next state of the application in store, `getState()`, and pass the new version of the todos to the `TodoApp` component, which is going to render the updated todos.

```javascript
const render = () => {
  ReactDOM.render(<TodoApp todos={store.getState().todos}/>, document.getElementById('root'));
};

store.subscribe(render);
render();
```

**[5]** Finally, this **child of the list item**, depends on the **todo.completed** field, which we just updated, which is why it re-renders in a cross-child state.

[>>> 19. React Todo List Example (Filtering Todos)](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/19)

