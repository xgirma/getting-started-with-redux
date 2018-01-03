# 07. Implementing Store from Scratch

[06. Store Methods: getState(), dispatch(), and subscribe()](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/06)

Build a reasonable approximation of the Redux Store in 20 lines. No magic! :poodle: :poodle: :poodle:

We know that the store holds the current `state`. We keep it in a variable, and the `getState` function is going to return the current value of that variable. This function, combined with the `dispatch` function and a `subscribe` function on a single object is what we call the Redux store.

```javascript
const createStore = (reducer) => {
  let state;
  
  const getState = () => state;
  
  const dispatch = (action) => {};
  
  const subscribe = (listener) => {};
  
  return { getState, dispatch, subscribe }
}
```

Because the `subscribe` function can be called many times, we need to keep track of all the changed listeners. Any time it is called we want to push the new `listener` into the array. Dispatching an action is the only way to change the internal state.

```javascript
const createStore = (reducer) => {
  let state;
  let listeners = [];
  
  const getState = () => state;
  
  const dispatch = (action) => {};
  
  const subscribe = (listener) => {
    listeners.push(listener);
  };
  
  return { getState, dispatch, subscribe }
}
```

Dispatching an action is the only way to change internal state. In order to calculate the new state we call the `reducer` with the current `state` and the `action` being dispatched. After the `state` was updated, we need to notify every changed listener, by calling it.

```javascript
const createStore = (reducer) => {
  let state;
  let listeners = [];
  
  const getState = () => state;
  
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  
  const subscribe = (listener) => {
    listeners.push(listener);
  };
  
  return { getState, dispatch, subscribe }
}
```

There is an important missing piece here. We haven't provided a way to `unsubscribe` a listener. Instead of adding a dedicated `unsubscribe` method, we'll just return a function from the `subscribe` method that removes this listener from the `listeners` array.

```javascript
const createStore = (reducer) => {
  let state;
  let listeners = [];
  
  const getState = () => state;
  
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  };
  
  return { getState, dispatch, subscribe }
}
```

Finally, by the time the store is returned we wanted to have the initial state populated. We're going to `dispatch` a dummy action just to get the reducer to return the initial value.

```javascript
const createStore = (reducer) => {
  let state;
  let listeners = [];
  
  const getState = () => state;
  
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  };
  
  dispatch({});
  
  return { getState, dispatch, subscribe }
}
```

This implementation of the Redux store apart from a few minor details and edge cases, is the createStore shipped with Redux.

[06. React Counter Example](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/08)