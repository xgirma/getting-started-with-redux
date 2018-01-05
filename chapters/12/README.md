# 12. Writing a Todo List Reducer (Toggling a Todo)

[<<< 11. Writting a Todo List Reducer (Adding a Todo)](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/11)

In this lesson, we will follow the same approach to implement another action called `TOGGLE_TODO`. We're going to start with a test again.

```javascript
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
```
Test: :x:

<img width="1055" alt="screen shot 2018-01-04 at 1 24 05 am" src="https://user-images.githubusercontent.com/5876481/34557122-0f603dd0-f0ee-11e7-959f-137f31f9a79d.png">

My test is a function, so I need to call it at the end of the file. If I run it, it fails because I have not implemented handling this action yet. _So it returns the default case_.

I'm adding a `new switch case to my reducer`. I remember that I shouldn't change the original array, so I'm using the array map method to produce a new array.

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

Now test is passing !!!

The function I pass as an argument will be called for every `todo`. If it's not a `todo` I'm looking for, I don't want to change it. I just return it as is. However, if the `todo` is the one we want to toggle, I'm going to return a new object that has all the properties of the original todo object thanks to the object's spread operator, but also an inverted value of the completed field.

[>>> 13. Reducer Composition with Arrays](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/13)