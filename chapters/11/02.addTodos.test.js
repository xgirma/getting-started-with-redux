import deepFreeze from 'deep-freeze';
import todos from './02.addTodos';

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
});