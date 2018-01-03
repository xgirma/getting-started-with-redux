# 09. Avoiding Array Mutations with concat(), slice(), and ...spread
[08. React Counter Example](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/08)

## push
The first function I want to write is called `addCounter`, and all it should do is to `append a 0 at the end` of the past array.

```javascript
const addCounter = (list) => {
  list.push(0);
  return list;
};
```
:skull: mutable :skull:

```javascript
it('should mutate', () => {
  const listBefore = [];
  const listAfter = [0];
  expect(addCounter(listBefore)).toEqual(listAfter);
  expect(listBefore).toEqual(listAfter);
});
```
Test: :white_check_mark:
## deep freeze
At first, I use the array push method to add a new item at the end of the array, and it works. However, we need to learn to avoid mutations in Redux, and I'm enforcing this by calling **deepFreeze** on the original array.

```javascript
const addCounter = (list) => {
  list.push(0);
  return list;
};
```
:skull: mutable :skull:

```javascript
import deepFreeze from 'deep-freeze';

it('should not mutate, with deep-freeze', () => {
  const listBefore = [];
  const listAfter = [0];
  
  deepFreeze(listBefore);
  
  expect(addCounter(listBefore)).toEqual(listAfter);
});
```
Test: :x:

<img width="645" alt="screen shot 2018-01-03 at 2 44 30 am" src="https://user-images.githubusercontent.com/5876481/34517507-1c697078-f030-11e7-861b-910123271b43.png">

Now my attempt to push does not work. `It cannot add a new property to a frozen object`. 

## concat
Instead of `push`, I'm going to use the `concat` method, which `does not modify the original array`.

```javascript
const addCounter = (list) => {
  return list.concat(0);
};
```
:ok_hand: immutable :ok_hand:

```javascript
import deepFreeze from 'deep-freeze';

it('should not mutate, with deep-freeze', () => {
  const listBefore = [];
  const listAfter = [0];
  
  deepFreeze(listBefore);
  
  expect(addCounter(listBefore)).toEqual(listAfter);
  expect(addCounter).not.toEqual(listAfter);
});
```
Test Test: :white_check_mark:

## array spread operator
Now the tests pass without mutations, and I can also use the new `ES6 array spread operator` to write the same code in a more concise way.

```javascript
const addCounter = (list) => {
  return [...list, 0];
};
```
:ok_hand: immutable :ok_hand:

```javascript
import deepFreeze from 'deep-freeze';

describe('mutable', () => {
  it('should not mutate, with deep-freeze + array spread', () => {
    const listBefore = [];
    const listAfter = [0];

    deepFreeze(listBefore);

    expect(addCounter(listBefore)).toEqual(listAfter);
    expect(listBefore).not.toEqual(listAfter);
  });
});
```
Test Test: :white_check_mark:

## splice
My next function is called removeCounter, and it accepts two arguments, an array of numbers, and the index of the number to skip from the array.

Usually, to delete an item from the array, I would use the `splice` method. However, `splice is a mutating method`, so **you can't use it in Redux**.

```javascript
const removeCounter = (list, index) => {
  list.splice(index, 1);
  return list
};
```
:skull: mutable :skull:

```javascript
it('should mutate, with splice', () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  expect(removeCounter(listBefore, 1)).toEqual(listAfter);
  expect(listBefore).toEqual(listAfter);
});
```
Test Test: :white_check_mark:

With deep-freeze, test fails
```javascript
const removeCounter = (list, index) => {
  list.splice(index, 1);
  return list
};
```
:skull: mutable :skull:

```javascript
it('should mutate, with splice', () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  deepFreeze(listBefore);

  expect(removeCounter(listBefore, 1)).toEqual(listAfter);
  expect(listBefore).toEqual(listAfter);
});
```
Test: :x:

<img width="584" alt="screen shot 2018-01-03 at 4 18 36 am" src="https://user-images.githubusercontent.com/5876481/34520396-4748adce-f03d-11e7-8637-3e3ebaa39268.png">

I'm going to **deepFreeze** the array object, and now I need to figure out a different way to remove an item from the array without mutating it.

## slice with concat
I'm using a method called `slice` here, and it doesn't have anything to do with splice. **It is not mutating**, and it gives me a part of the array from some beginning to some end index.

What Im doing is that Im taking the parts before the index I want to skip and after the index I want to skip, and I concatenate them to get a new array.

```javascript
const removeCounter = (list, index) => {
  return list
    .slice(0, index)
    .concat(list.slice(index + 1));
};
```
:ok_hand: immutable :ok_hand:

```javascript
it('should not mutate, with slice', () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  deepFreeze(listBefore);

  expect(removeCounter(listBefore, 1)).toEqual(listAfter);
  expect(listBefore).not.toEqual(listAfter);
});
```
Test: :white_check_mark:

## array spread
Finally, instead of writing it as a method chain with `concat` calls, I can use the `ES6 array spread operator` to write it more concisely.

```javascript
const removeCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ]
};
```
:ok_hand: immutable :ok_hand:

```javascript
it('should not mutate, with slice', () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  deepFreeze(listBefore);

  expect(removeCounter(listBefore, 1)).toEqual(listAfter);
  expect(listBefore).not.toEqual(listAfter);
});
```
Test: :white_check_mark:

## incrementing
Now that we implemented adding and removing counters, let's implement increment in the counter. The incrementCounter function takes two arguments, the array and the index of the counter that should be incremented, so the return value has the same count of items, but one of them is incremented.

```javascript
const incrementCounter = (list, index) => {
  list[index]++;
  return list;
};
```
:skull: mutable :skull:

```javascript
it('should mutate', () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];

  expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
  expect(listBefore).toEqual(listAfter);
});
```
Test: :white_check_mark:

Directly setting the array value at index works, but this is a mutation. If we add a deepFreeze call, it's not going to work anymore.

```javascript
const incrementCounter = (list, index) => {
  list[index]++;
  return list;
};
```
:skull: mutable :skull:

```javascript
it('should mutate', () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];

  deepFreeze(listBefore);

  expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
});
```
Test: :x:

<img width="771" alt="screen shot 2018-01-03 at 3 36 17 am" src="https://user-images.githubusercontent.com/5876481/34519083-4ebd7ed2-f037-11e7-906c-16367c5d5970.png">

So how do we replace a single value in the array without mutating it? It turns out that the answer is really similar to how we remove an item. We want to take the slice before the index, concat it with a single item array with a new value, and then concat it with the rest of the original array.

## slice an concat
with concat
```javascript
const incrementCounter = (list, index) => {
  return list
    .slice(0, index)
    .concat(list[index] + 1)
    .concat(list.slice(index + 1));
};
```
:ok_hand: immutable :ok_hand:

```javascript
it('should not mutate, with slice, concat', () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];

  deepFreeze(listBefore);

  expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
  expect(listBefore).not.toEqual(listAfter);
});
```
Test: :white_check_mark:

with ES6 array spread operator
```javascript
const incrementCounter = (list, index) => {
  return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1)
  ]
};
```
:ok_hand: immutable :ok_hand:

Finally, with the ES6 spread operator, we can spread over the left part of the array, specify the new item, and then spread over the right part of the original array, and this looks much nicer.

```javascript
it('should mutate', () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];

  deepFreeze(listBefore);

  expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
  expect(listBefore).not.toEqual(listAfter);
});
```
Test: :white_check_mark:

In this lesson, you learned how to use the `concat` method or the `spread operator`, and the slice method to **add, remove, and change items in arrays without mutating** them, and how to protect yourself with deepFreeze from mutation in your tests.

[10. React Counter Example](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/10)