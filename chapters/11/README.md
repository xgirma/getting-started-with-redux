# Avoiding Array Mutation with Object.assign() and ...spread

[09. Avoiding Array Mutations with concat(), slice(), and ...spread](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/09)

Just like in the previous two lessons, I'm using `expect` library (now a part of Jest) to make test `assertions` and `deep-freeze` library to prevent accidental mutations in my code. In this lesson, I will create the `reducer` for `a todo list` application whose state is described an `array of todos`.

Just to remind you what a **reducer** is, it's **a pure function you write to implement the update logic of your application** -- that is, `how the next state is calculated given the current state and the action being dispatched`.

Reducer
```javascript
const todos = (state =[], action) => {};
```
Let us write test first. 

**We want to make sure that the reducer is a pure function**, so I'm calling `deepFreeze` both on the `stateBefore` and the `action`. Finally, I am ready to use the expect library to verify that if I call the todo reducer with the stateBefore and the action object, I'm going to get the result that is **deeply equal** to the stateAfter I just declared.

Test:
```javascript
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
```
Test: :x:

<img width="784" alt="screen shot 2018-01-03 at 11 08 57 pm" src="https://user-images.githubusercontent.com/5876481/34553223-263d56cc-f0db-11e7-938a-7a8f2200f4c9.png">

Of course, it fails because the reducer is not implemented yet. It's an empty function. So it returns _undefined_ instead of the array with a single item that I expect in the test.

Reducer
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
    default:
      return state
  }
};

export default todos;
```
Finally, I add a **default case to my switch statement because every reducer has to return the current state for any unknown action**.

Test
```javascript
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
```
Test: :white_check_mark:

Let's recap the data flow in this example to see why.

[1] I create the state array, which is an empty array, and the action object inside my test function. I'm passing them as arguments to my `reducer` function, called, `todos`.

```javascript
const testAddTodo = () => {
  const stateBefore = [];
  const action = { ... };
  const stateAfter = [ ... ];
};

expect(
  todos(stateBefore, action)
  ).toEqual(stateAfter);
```

[2] The `todos reducer` accepts the state and the action as arguments and takes a look at the `action.type`.

[3] In this case, the `action.type` is a string saying, `ADD_TODO`, so it matches the switch case inside the reducer. The **reducer returns a new array which contains the items from the old array** and the new item representing the added todo.

[4] However, **the state we passed from the test was actually an empty array**, so, at the end, we're going to get an array with a single item, which is the new todo.

[5] Finally, we compare the return value to an array with a single todo item to make sure that the reducer works as intended. The equality check passes. This makes the test successful.

[11. Writing a Todo List Reducer (Adding a Todo)](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/11)