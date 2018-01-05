import deepFreeze from 'deep-freeze';
import visibilityFilter from './02.visibility.filter';

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

    expect(visibilityFilter(visibilityBefore, action)).toEqual(visibilityAfter)
    expect(visibilityBefore).not.toEqual(visibilityAfter)
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

    expect(visibilityFilter(visibilityBefore, action)).toEqual(visibilityAfter)
    expect(visibilityBefore).toEqual(visibilityAfter)
  });
});