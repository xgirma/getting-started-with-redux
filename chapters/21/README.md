# 21. Extracting Presentational Components (AddTodo, Footer, FilterLink)

[<<< 20. Extracting Presentational Components (Todo, TodoList)](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/20)

**[1]** Now I want to extract the `input` and the `button` into a separate component called, **AddTodo** I'm declaring AddTodo as a **functional component** that doesn't accept any props. I'm going to return these copy pasted input and button, but I'm `wrapping them in a div because a component needs to have a single root element`.

```javascript
const { Component } = React;

const AddTodo = () => {
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
    </div>
  )
};
```

**The functional components don't have instances**. However, instead of using **this**, I can use a `local variable` called, girma, that I'm going to close over so I can write to it in the callback ref and I can read from it in the event handler.

```javascript
const { Component } = React;

const AddTodo = () => {
  let girma;

  return (
    <div>
      <input ref={node => {girma = node }}/>

      <button onClick={() => {}}>
        Add Todo
      </button>
    </div>
  )
};
```

Like previously, I want it to be a presentational component and not specify behavior, so I just called the function called, **onAddClick** passing the current input value. I make onAddClick a prop so that the component that uses AddTodo can specify what happens when that button is clicked.

```javascript
const { Component } = React;

const AddTodo = ({ onAddClick }) => {
  let girma;

  return (
    <div>
      <input ref={node => {girma = node }}/>

      <button onClick={() => { 
        onAddClick(girma.value); 
        girma.value=''
      }}>
        Add Todo
      </button>
    </div>
  )
};
```
**[2]** Again, the **TodoApp component acts as a container componen**t for the AddTodo. It specifies that when add button is clicked, we should dispatch an action with the type ADD_TODO, the corresponding text, and the next todo id.

```html
<AddTodo
  onAddClick={text => store.dispatch({
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  })
  }/>
```

**[3]** The last component I want to extract today is the **Footer**, which contains all these three filter links. I'm creating a new functional component called, Footer. I'm not sure which props it needs, so I skip them. I paste the markup. It seems that the FilterLink need the visibilityFilter, so I add it as a prop.

```javascript
const Footer = ({ visibilityFilter }) => (
  <p>
    Show:{' ['}
    <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter}> All </FilterLink>{']  ['}
    <FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter}> Active </FilterLink>{']  ['}
    <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter}> Completed </FilterLink>{']'}
  </p>
);
```

I would like the `Footer` and the `FilterLink` to be presentational components. However, the FilterLink includes a short dispatch call. **I am replacing it with an onClick call**. I pass the filter as the single parameter for the calling component's convenience. I add onClick to the props.

```javascript
const FilterLink = ({filter, currentFilter, children, onClick}) => {
  if(filter === currentFilter) {
    return <span>{children}</span>
  }
  return (
    <a href='#'
       onClick={ event => {
         event.preventDefault();
         onClick(filter);
       }}
    >
      {children}
    </a>
  )
};
```

```javascript
const Footer = ({ visibilityFilter, onFilterClick }) => (
  <p>
    Show:{' ['}
    <FilterLink
      filter='SHOW_ALL'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    > All </FilterLink>{']  ['}

    <FilterLink
      filter='SHOW_ACTIVE'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    > Active </FilterLink>{']  ['}

    <FilterLink
      filter='SHOW_COMPLETED'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    > Completed </FilterLink>{']'}
  </p>
);
```

Now I need to specify it every time FilterLink is used. I add onFilterClick to the Footer. I pass onClick={onFilterClick} for every FilterLink in the Footer, so whatever we pass to the Footer as onFilterClick prop is going to end up in the Filter link as onClick.

Now I can use the Footer component I just defined inside my TodoApp component. I need to pass to props, one of them is the visibilityFilter so it can highlight the active link. Another prop is onFilterClick where I say that whenever a filter is clicked, I want to dispatch an action with a type set visibilityFilter and the filter being clicked.

```javascript
<Footer
  visibilityFilter={visibilityFilter}
  onFilterClick={filter =>
    store.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter
    })}
/>
```

Finally, I just noticed that the TodoApp component doesn't actually have to be a class. I can turn it into a function. I prefer to do that when possible.

Instead of destructuring the props inside the render method, I am now doing it inside the argument. I can remove now the destructuring. I'm also going to remove the render method declaration. The visibleTodos are only used in a single place, so I'm moving the getVisibleTodos call to the TodoList todos prop declaration. Now the body of my function is just a single expression, so I can get rid of the return statement and unindent code to make it look nicer.

```javascript
let nextTodoId = 0;
const { Component } = React;
const TodoApp = ({ todos, visibilityFilter }) => (
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
```

[>>> 22. Extracting Container Components (FilterLink)](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/22)