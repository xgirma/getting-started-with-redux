# 10. Avoiding Object Mutations with Object.assign() and ...spread
[<<< 09. Avoiding Array Mutations with concat(), slice(), and ...spread](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/09)

Learn how to use **Object.assign()** and the **spread** operator proposed for ES7 to avoid mutating objects.

Like in previous example, I use `expect` (now a part of `Jest`) and `deep-freeze` libraries from NPM to make my test assertions. This time, I'm testing a function called `toggleTodo` that takes our todo object and flips its completed field. If completed was false, it should be true in the return value. If it was true, it should be false.

Just like in the previous lesson, I'm going to start by writing a `mutated version` that passes the current test. A mutated version just `flips the completed field`, **reassigns** _it on the past object_.

Reducer
```javascript
const toggleTodo = (todo) => {
  todo.completed = !todo.completed;
  return todo;
};
```

Test
```javascript
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
```
Test: :white_check_mark:

## deep-freeze
While it works, we know that **mutations are not allowed in Redux**. 

Reducer
```javascript
const toggleTodo = (todo) => {
  todo.completed = !todo.completed;
  return todo;
};
```
So to enforce this, I'm calling `deepFreeze` on my todo object. I'm not allowed to change its completed field anymore.

Test: 
```javascript
it('should not be mutable', () => {
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
```
Test: :x:

<img width="832" alt="screen shot 2018-01-04 at 12 01 11 am" src="https://user-images.githubusercontent.com/5876481/34554586-71cd87cc-f0e2-11e7-9c97-d5535510085a.png">

## create new object with every field copied from the original
One way out of this would be to `create the new object with every field copied from the original object` except the completed field, which would be flipped.

Reducer: 
```javascript
const toggleTodo = (todo) => {
  return {
    id: todo.id,
    text: todo.text,
    completed: !todo.completed
  }
};
```

Test
```javascript
it('should not be mutable', () => {
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
```
Test: :white_check_mark:

Pass. However, **if we later add new properties to the new object**, we might forget to update this piece of code to include them.

## Object.assign

This is why I suggest you to use Object.assign method, which is new to ES6. It lets you **assign properties of several objects onto the target object**. Note how the object assign argument order corresponds to that of the JavaScript assignment operator.

Reducer
```javascript
const toggleTodo = (todo) => {
  return Object.assign({}, todo, {
    completed: !todo.completed
  });
};
```

Test
```javascript
it('should not be mutable', () => {
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
```
Test: :white_check_mark:

The `left argument is the one whose properties are going to be assigned`, so it's going to be `mutated`. This is why we're passing an `empty object as the first argument`, **so we don't mutate any existing data**. Every further argument to `Object.assign` will be considered one of the source objects whose properties will be copied to the target object.

It is important that if several sources specify different values for the same property, **the last one wins**. This is what we use to override the completed field despite what the original todo object says.

Finally, you need to remember that `Object.assign is a new method in ES6`, so it is not natively available in all the browsers. You should use a **polyfill**, either the one that ships with **Babel** or a standalone Object.assign polyfill, to use it without risking crashing your website.

## object spread
Another option that doesn't require a polyfill is to use the new object `spread operator`, which is not part of ES6. However, it is **proposed for ES7**. It is fairly popular, and it is enabled in **Babel** if you use the stage two preset.

Reducer:
```javascript
const toggleTodo = (todo) => {
  return {
    ...todo,
    completed: !todo.completed
  };
};
```
Test
```javascript
it('should not be mutable', () => {
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
```
Test: :white_check_mark:

[>>> 11. Writting a Todo List Reducer (Adding a Todo)](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/11)