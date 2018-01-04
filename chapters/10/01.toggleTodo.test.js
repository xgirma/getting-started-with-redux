import todos from './01.toggleTodo';

describe('mutable', () => {
  it('should be mutable', () => {
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

    expect(todos(todoBefore)).toEqual(todoAfter);
    expect(todoBefore).toEqual(todoAfter);
  });
});