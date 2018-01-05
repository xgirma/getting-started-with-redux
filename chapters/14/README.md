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
      return action.filter;
    default:
      return state;
  }
};
```

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
```
Test: :white_check_mark:

The state of the visibilityFilter is a simple string representing the current filter. It is changed by `SET_VISIBILITY_FILTER` action.



[15. Reducer Composition with CombineReducers()](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/15)
