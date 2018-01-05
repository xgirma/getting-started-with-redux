# 13. Reducer Composition with Arrays

[12. Writting a Todo List Reducer (Toggling a Todo)](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/12)
In the previous lesson we created a reducer that can handle two actions, adding a new todo, and toggling an existing todo. Right now, **the code to update the todo item or to create a new one is placed right inside of the todos reducer**.

```javascript
const todos = (state =[], action) => {
  switch(action.type){
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case 'TOGGLE_TODO':
      return state.map(todo => {
        if(todo.id !== action.id){
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed
        }
      });
    default:
      return state
  }
};
```

**This function is hard to understand because it tries to address two different concerns**, 

    1. how the todos array is updated (TODOS update), and 
    2. how individual todos are updated (TODO update). 
    
This is not a problem unique to Redux. `Any time a function does too many things, you want to extract other functions from it`, and `call them so that every function only addresses a single concern`.

In this case, i decided that creating and updating a todo in response to an action is a separate operation, and needs to be handled by a separate function called `todo`.

```diff
+ const todo = (state, action) => {
+   switch(action.type) {
+    case 'ADD_TODO':
+      return {
+        id: action.id,
+        text: action.text,
+        completed: false
+      };
+    default:
+      return state;
+  }
+ };

const todos = (state =[], action) => {
  switch(action.type){
    case 'ADD_TODO':
      return [
        ...state,
+        todo(undefined, action)
-        {
-          id: action.id,
-          text: action.text,
-          completed: false
-        }
-      ];
    case 'TOGGLE_TODO':
      return state.map(todo => {
        console.log('*** id: ', todo.id);
        if(todo.id !== action.id){
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed
        }
      });
    default:
      return state
  }
};
```

Test
```javascript
import deepFreeze from 'deep-freeze';
import todos from './02.todos';

describe('immutable', () => {
  it('should not mutate, with deep-freeze of beforeState, and action', () => {
    const todosBefore = [];
    const action = {
      type: 'ADD_TODO',
      id: 0,
      text: 'Learn Redux'
    };
    const todosAfter = [{
      id: 0,
      text: 'Learn Redux',
      completed: false
    }];

    deepFreeze(todosBefore);
    deepFreeze(action);

    expect(todos(todosBefore, action)).toEqual(todosAfter);
    expect(todosBefore).not.toEqual(todosAfter);
  });

  it('should not mutate, with deep-freeze of beforeState, and action', () => {
    const todosBefore = [
      {
        id: 0,
        text: 'Learn Redux',
        completed: false
      },
      {
        id: 1,
        text: 'Go shopping',
        completed: false
      }
    ];

    const action = {
      type: 'TOGGLE_TODO',
      id: 1
    };

    const todosAfter = [
      {
        id: 0,
        text: 'Learn Redux',
        completed: false
      },
      {
        id: 1,
        text: 'Go shopping',
        completed: true
      }
    ];

    deepFreeze(todosBefore);
    deepFreeze(action);

    expect(todos(todosBefore, action)).toEqual(todosAfter);
    expect(todosBefore).not.toEqual(todosAfter);
  });
});
```
Test: :white_check_mark:

For toggle todos, I decided that it should `accept two arguments`, the current **state/todo** and the **action** being dispatched, and it should **return the next state**.

In this case, this **state** refers to the **individual todo**, and not to the list of todos. Finally, there is no magic in Redux to make it work. We **extracted the todo reducer from the todos reducer**, so now we need to call it for every todo, and assemble the results into an array.

    Extracted the todo reducer from the todos reducer.
    
```diff
const todo = (state, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
+    case 'TOGGLE_TODO':
+      if(state.id !== action.id){
+        return state;
+      }
+      return {
+        ...state,
+        completed: !state.completed
+      };
    default:
        return state;
  }
};

const todos = (state =[], action) => {
  switch(action.type){
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
+      return state.map(t => todo(t, action));
-      return state.map(todo => {
-        console.log('*** id: ', todo.id);
-        if(todo.id !== action.id){
-          return todo;
-        }
-
-        return {
-          ...todo,
-          completed: !todo.completed
-        }
-      });
    default:
      return state
  }
};
```   

While this is not required in this particular example, I suggest that you always have the **default case where you return the current state** to avoid all problems in the future. 

The pattern described in this lesson is pervasive in Redux's development, and is called **reducer composition**.

Test
```javascript
import deepFreeze from 'deep-freeze';
import todos from './02.todos';

describe('immutable', () => {
  it('should not mutate, with deep-freeze of beforeState, and action', () => {
    const todosBefore = [];
    const action = {
      type: 'ADD_TODO',
      id: 0,
      text: 'Learn Redux'
    };
    const todosAfter = [{
      id: 0,
      text: 'Learn Redux',
      completed: false
    }];

    deepFreeze(todosBefore);
    deepFreeze(action);

    expect(todos(todosBefore, action)).toEqual(todosAfter);
    expect(todosBefore).not.toEqual(todosAfter);
  });

  it('should not mutate, with deep-freeze of beforeState, and action', () => {
    const todosBefore = [
      {
        id: 0,
        text: 'Learn Redux',
        completed: false
      },
      {
        id: 1,
        text: 'Go shopping',
        completed: false
      }
    ];

    const action = {
      type: 'TOGGLE_TODO',
      id: 1
    };

    const todosAfter = [
      {
        id: 0,
        text: 'Learn Redux',
        completed: false
      },
      {
        id: 1,
        text: 'Go shopping',
        completed: true
      }
    ];

    deepFreeze(todosBefore);
    deepFreeze(action);

    expect(todos(todosBefore, action)).toEqual(todosAfter);
    expect(todosBefore).not.toEqual(todosAfter);
  });
});
```
Test: :white_check_mark:

Different reducers specify how different parts of the state tree are updated in response to actions. **Reducers are also normal JavaScript functions, so they can call other reducers to delegate and abstract** a way of handling of updates of some parts of this tree they manage.

> This pattern can be applied many times, and while there is still a single top level reducer managing the state of your app, you will find it convenient to express it as many reducers call on each other, each contribution to a part of the applications state tree.

[14. Reducer Composition with Objects](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/14)