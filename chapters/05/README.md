# 05. Writting a Counter Reducer with Tests

[>>> 04. The Reducer Function](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/04)

Reducer accepts **state** and **action** as arguments and returns the next state.

```javascript
function counter(state, action) {
  if(action.type === 'INCREMENT'){
    return state + 1;
  } else if (action.type === 'DECREMENT') {
    return state - 1;
  }
}
```

```javascript
expect(
  counter(2, { type: 'DECREMENT' })
).toEqual(1);

expect(
  counter(1, { type: 'DECREMENT' })
).toEqual(0);
```
Test pass. However, if we check for that we will see that this test fails, because we currently `don't handle unknown actions`.

```javascript
expect(
  counter(1,{ type: 'SOMETHING_ELSE' })
).toEqual(1);
```
If we dispatch an action that it does not understand, it should return the `current state` of the application.

```javascript
function counter(state, action) {
  if(action.type === 'INCREMENT'){
    return state + 1;
  } else if (action.type === 'DECREMENT') {
    return state - 1;
  }
  return state;
}
```

```javascript
expect(
  counter(undefined, {})
).toEqual(0);
```

The convention we use in Redux is that `if the reducer receives undefined as the state argument, it must return what it considers to be the initial state of the application`. In this case let it will be 0.

```javascript
function counter(state, action) {
  if (typeof state === 'undefined'){
    return 0;
  }
}
```

Now come a few cosmetic tweaks. Now come a few cosmetic tweaks. I'll replace this bunch of tweaks with a switch statement and I'm going to replace this condition with ES6 default argument, which looks better. I'm also going to replace the function declaration with an arrow function, which has clearer semantics in ES6.

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
}
```

[<<< 06. Store Methods: getState(), dispatch(), and subscribe()](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/06)