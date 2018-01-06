# 16. Implementing combineReducers() from Scratch

[<<< 15. Reducer composition with combineReducers()](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/15)

Learn how to build a reasonable approximation of the combineReducers() utility in 15 lines. No magic!

```javascript
const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](
          state[key],
          action
        );
        return nextState;
      },
      {}
    );
  };
};
```

[>>> 17. React Todo List Example (Adding a Todo)](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/17)

