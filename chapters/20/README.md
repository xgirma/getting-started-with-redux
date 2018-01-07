# 20. Extracting Presentational Components (Todo, TodoList)

[19. React Todo List Example (Filtering Todos)](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/19)

Learn how to `separate` the **looks** from the **behavior** by extracting presentational components. So we're going to refactor our application in this lesson.

**[1]** The first component I want to extract from the TodoApp component is the **Todo component** that renders a single list item. 

Right now, I have **hardcoded that clicking a todo always causes the TOGGLE_TODO action**. This is perfectly fine to do in your app.

However, I prefer to have a bunch of components that don't specify any behaviors, and that are only concerned with how things look or how they render. I call such components the `presentational components`.

```javascript
const { Component } = React;

const Todo = ({}) => (
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
  </li>
);
```

> I would like to give todo a presentational component, so I removed the onClick handler. I promote it to be a prop so that anyone who uses todo component can specify what happens on the click.


```javascript
const { Component } = React;

const Todo = ({ onClick }) => (
  <li
    onClick={onClick}
    style={{textDecoration: todo.completed? 'line-through': 'none'}}
  >
    {todo.text}
  </li>
);
```

Finally, while it doesn't have a lot of difference, I prefer to keep it explicit what is the data that the component needs to render. Instead of passing a todo object, I pass `completed` and **text** fields as separate props.

```javascript
const { Component } = React;

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{textDecoration: completed? 'line-through': 'none'}}
  >
    {text}
  </li>
);
```

**Note how the todo component is now a purely presentational component** and doesn't specify any behavior. But it knows how to render AddTodo.

**[2]** The next component I create is called TodoList. It's also a presentational component. It's only concerned with how things look.

It **accepts an array of todos**. It's going to render an unordered list of them by calling the **todos.map** function and rendering at todo component for every todo. It tells React to use **todo.id** as the unique key for the elements. **It spreads over the todo object properties so the text and completed end up as props on the todo component**.

```javascript
const { Component } = React;

const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => <Todo key={todo.id} {...todo} />)}
  </ul>
);
```

I need to specify what happens when a todo is clicked. I could have dispatched an action here. Again, that would be fine, but I want it to be a presentational component, so I'm going to call another function, called **onTodoClick()**, and pass todo.id, and let it decide what should happen. **onTodoClick is another prop for the TodoList.**

```javascript
const { Component } = React;

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick{() => onTodoClick(todo.id)}
      />)}
  </ul>
);
```

Both **Todo and TodoList are presentational components**, so we need something I call, **container components** to actually pass the data from this store and to specify the behavior. In this case, the top level **TodoApp component acts as a container component**.

```html
<TodoList todos={visibleTodos}
          onTodoClick={ id =>
            store.dispatch({
              type: 'TOGGLE_TODO',
              id
            })
          } />
```
> In this case, it just renders the TodoList with visibleTodos as the todos, and with a callback that says that when onTodoClick is called with a todo id, we should dispatch an action on the store with the type TOGGLE_TODO and the id of the todo.

## Let's recap again how this works.
The TodoApp component renders a TodoList, and it passes a function to it that can dispatch an action. The TodoList component renders the Todo component and passes on click prop which calls onTodoClick.

The Todo component just uses the onClick prop it receives and binds it to the list item onClick. This way, when it's called, the onTodoClick is called, and this dispatches the action and updates the visibleTodos because the action updates the store.


[21. Extracting Container Components (FilterLink)](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/21)