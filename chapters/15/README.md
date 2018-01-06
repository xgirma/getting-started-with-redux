# 15. Reducer composition with combineReducers()

[<<< 14. Reducer Composition with Objects](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/14)

Learn how to use **combineReducers()** utility function to generate a reducer from several other reducers instead of writing it by hand.

In the previous lesson we learned how to use the reducer composition pattern to let different reducers handle different parts of the state tree, and then combine their results.

```javascript
const todoApp = (state = {}, action) => {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  };
};
```

`This pattern is so common that it's present in most Redux applications`. This is why **Redux provides a function called combineReducers** that lets you avoid writing this code by hand. Instead, it generates the top level reducer for you.

```javascript
import { combineReducers } from 'redux';
const todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
})
```
The only argument to combine reducers is an **object**. This object lets me specify the **mapping between the state field names, and the reducers managing them**. The return value of the combineReducer is called a Reducer function, which is pretty much equivalent to the reducer function I wrote by hand previously.

`The keys of the object I configure combinedReducers with correspond to the fields that the state object is going to manage`. The values of the object I have asked to combineReducer, are the producers we should call to update the correspondence state fields.

```javascript
const todos = (state = [], action) => {
  // ...
};


const visibilityFilter = (state = 'SHOW_ALL', action) => {
  // ...
};
```

This combineReducer call says that the **todo's** field inside the state object managers will be updated by the **todos reducer**, and the **visibilityFilter** field inside the state object will be updated by calling the **visibilityFilter reducer**. The **results will be assembled into a single object**. In other words, it behaves pretty much exactly as the function commented down below.

```diff
+ import { combineReducers } from 'redux';

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};


const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return {filter: action.filter};
    default:
      return state;
  }
};

+ const todoApp = combineReducers({
+   todos: todos,
+   visibilityFilter: visibilityFilter
+ })

- const todoApp = (state = {}, action) => {
-   return {
-    todos: todos(state.todos, action),
-     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
-   };
- };

export default todoApp;
```
Test: :white_check_mark:

> Finally, I will establish a useful convention. I will always name my reducers after the state keys they manage. 

Since the key names and the value names are now the same, I can omit the values thanks to the `ES6 object literal shorthand notation`.

```javascript
const todoApp = combineReducers({ todos, visibilityFilter });
```


[>>> 16. Implementing combineReducers() from Scratch](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/16)