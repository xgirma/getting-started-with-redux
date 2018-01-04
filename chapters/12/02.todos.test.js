import deepFreeze from 'deep-freeze';
import todos from './02.todos';

describe('immutable', () => {
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