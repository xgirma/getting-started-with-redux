# 14 Reducer Composition with Objects
[13. Reducer Composition with Arrays](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/13)
In the previous lesson, we established the `pattern of reducer composition` where one reducer can be called by another reducer to update items inside an `array`.

Representing the whole state of the application as an `array of todos works for a simple example`, but what if we want to store more information? For example, we may want to let the user choose which todos are currently visible with the **visibilityFilter** such as `SHOW_COMPLETED, SHOW_ALL,` or `SHOW_ACTIVE`.

Filters
```javascript
const Filters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};
```

Reducer: (visibilityFilter)
```javascript
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return { filter : action.filter };
    default:
      return state;
  }
};
```
The state of the visibilityFilter is a simple string representing the current filter. It is changed by `SET_VISIBILITY_FILTER` action.

Test
```javascript
describe('immutable', () => {
  it('should not mutate, with deep-freeze of beforeState, and action', () =>{
    const visibilityBefore = {
      filter: "SHOW_ALL"
    };

    const action = {
      type: "SET_VISIBILITY_FILTER",
      filter: "SHOW_COMPLETED"
    };

    const visibilityAfter = {
      filter: "SHOW_COMPLETED"
    };

    deepFreeze(visibilityBefore);
    deepFreeze(action);

    expect(visibilityFilter(visibilityBefore, action)).toEqual(visibilityAfter);
    expect(visibilityBefore).not.toEqual(visibilityAfter);
  });

  it('should return default state', () =>{
    const visibilityBefore = {
      filter: "SHOW_ALL"
    };

    const action = {
      type: "INVALID_ACTION",
      filter: "SHOW_COMPLETED"
    };

    const visibilityAfter = {
      filter: "SHOW_ALL"
    };

    deepFreeze(visibilityBefore);
    deepFreeze(action);

    expect(visibilityFilter(visibilityBefore, action)).toEqual(visibilityAfter);
    expect(visibilityBefore).toEqual(visibilityAfter);
  });
});
```
Test: :white_check_mark:

## Reducer composition
To store this new information, `I don't need to change the existing reducers`. I will use the **reducer composition pattern** and **create a new reducer that calls the existing reducers to manage parts of its state and combines the results in a single state object**.

```javascript
const todoApp = (state = {}, action) => {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  };
};
```

`Now that the first time it runs, it will pass undefined as the state of the child reducers because the initial state of the combined reducer is an empty object`, so all its fields are undefined. This `gets the child reducers to return their initial states and populates the state object for the first time`.

```javascript
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
      return action.filter;
    default:
      return state;
  }
};

const todoApp = (state = {}, action) => {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  };
};

export default todoApp;
```

Test
```javascript
import deepFreeze from 'deep-freeze';
import todoApp from './03.todoApp';

describe('immutable: todos', () => {
  it('should not mutate, with deep-freeze of beforeState, and action', () => {
    const todosBefore = [];
    const action = {
      type: 'ADD_TODO',
      id: 0,
      text: 'Learn Redux'
    };
    const todosAfter = {
      todos: [{
        completed: false,
        id: 0,
        text: "Learn Redux"
      }],
      visibilityFilter: "SHOW_ALL"
    };

    deepFreeze(todosBefore);
    deepFreeze(action);

    expect(todoApp(todosBefore, action)).toEqual(todosAfter);
    expect(todosBefore).not.toEqual(todosAfter);
  });

  it('should not mutate, with deep-freeze of beforeState, and action', () => {
    const todosBefore = {
      todos: [
        {
          id: 0,
          text: "Learn Redux",
          completed: false,
        },
        {
          id: 1,
          text: 'Go shopping',
          completed: false
        }
      ],
      visibilityFilter: {}
    };

    const action = {
      type: 'TOGGLE_TODO',
      id: 1
    };

    const todosAfter = {
      todos: [
        {
          completed: false,
          id: 0,
          text: "Learn Redux"
        },
        {
          id: 1,
          text: 'Go shopping',
          completed: true
        }
      ],
      visibilityFilter: {}
    };

    deepFreeze(todosBefore);
    deepFreeze(action);

    expect(todoApp(todosBefore, action)).toEqual(todosAfter);
    expect(todosBefore).not.toEqual(todosAfter);
  });
});

describe('immutable: visibility', () => {
  it('should not mutate, with deep-freeze of beforeState, and action', () =>{
    const visibilityBefore = {todos: [{}], visibilityFilter: {filter: "SHOW_ALL"}};

    const action = {
      type: "SET_VISIBILITY_FILTER",
      filter: "SHOW_COMPLETED"
    };

    const visibilityAfter = {todos: [{}], visibilityFilter: {filter: "SHOW_COMPLETED"}};

    deepFreeze(visibilityBefore);
    deepFreeze(action);

    expect(todoApp(visibilityBefore, action)).toEqual(visibilityAfter);
    expect(visibilityBefore).not.toEqual(visibilityAfter);
  });

  it('should return default state', () =>{
    const visibilityBefore = {todos: [{}], visibilityFilter: {filter: "SHOW_ALL"}};

    const action = {
      type: "INVALID_ACTION",
      filter: "SHOW_COMPLETED"
    };

    const visibilityAfter = {todos: [{}], visibilityFilter: {filter: "SHOW_ALL"}};

    deepFreeze(visibilityBefore);
    deepFreeze(action);

    expect(todoApp(visibilityBefore, action)).toEqual(visibilityAfter);
    expect(visibilityBefore).toEqual(visibilityAfter);
  });
});
```
Test: :white_check_mark:

[15. Reducer Composition with CombineReducers()](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/15)
