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
