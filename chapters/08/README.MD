# 08. React Counter Example
[07. Implementing Store from Scratch](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/07)

Previously: update the document body manually.
```html
<script type="text/babel">
  const store = createStore(counter);

  const render = () => {
    document.body.innerText = store.getState();
  };

  store.subscribe(render);
  render();

  document.addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT' });
  });
</script>
```
In the simplest counter example, I `update the document body manually` any time this tool state changes. But, of course, this approach does not scale to complex applications. Instead of manually updating the DOM, I'm going to use **React**.

## Action

```javascript
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
```

## Counter dummy component
```javascript
const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);
```

## Reducer
```javascript
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};
```

## View layer
```html
<html>
<head>
  <meta charset="utf-8">
  <title>React Counter Example</title>
  <script src="https://unpkg.com/react@16.0.0/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16.0.0/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/babel-standalone@6.26.0/babel.min.js"></script>
  <script src="https://unpkg.com/redux@3.7.2/dist/redux.js"></script>

  <script type="text/jsx" src="reducer.jsx"></script>
  <script type="text/jsx" src="counter.jsx"></script>
  <script type="text/jsx" src="actions.jsx"></script>
</head>

<body>
<div id='root'></div>
<script type="text/babel">
  const store = Redux.createStore(counter);

  const render = () => {
    ReactDOM.render(<Counter
      value={store.getState()}
      onDecrement={() => {
        store.dispatch({ type: DECREMENT})
      }}
      onIncrement={() => {
        store.dispatch({ type: INCREMENT})
      }}
    />,
      document.getElementById('root')
    )
  };

  store.subscribe(render);
  render();

</script>
</body>
</html>
```


[09. Avoiding Array Mutations with concat(), slice(), and ...spread](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/09)
