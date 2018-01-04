import deepFreeze from 'deep-freeze';
import todos from './02.toggleTodo';

describe('immutable', () => {
  xit('should not be mutable', () => {
    const todoBefore = {
      id: 0,
      text: 'Learn Redux',
      completed: false
    };

    const todoAfter = {
      id: 0,
      text: 'Learn Redux',
      completed: true
    };

    deepFreeze(todoBefore);

    expect(todos(todoBefore)).toEqual(todoAfter);
    expect(todoBefore).not.toEqual(todoAfter);
  });
});