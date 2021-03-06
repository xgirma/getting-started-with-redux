# 03. Pure and Impure Functions

[<<< 02. Describing State Changes with Actions](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/02)

**Some functions are more predictable than others**. You will learn the difference between the pure and impure functions. Understanding this difference is essential for writing Redux applications.

Before we proceed any further, it's important that you understand the difference between the pure and impure functions. `The pure functions are the functions whose returned value depends solely on the values of their arguments`.

```javascript
// Pure function
function square(x){
  return x * x;
}
```

Pure functions do not have any **observable side effects**, such as network or database calls. The pure functions just calculate the new value. You can be confident that if you call the pure function with the same set of arguments, you're going to get the same returned value. They are predictable.

Also, pure functions do not modify the values passed to them. For example, squareAll function that accepts an array does not overwrite the items inside this array. Instead, it returns a new array by using items.map.

```javascript
// Pure function
function squareAll(items){
  return items.map(square);
}
```

On the opposite, impure functions may call the database or the network, they may have side effects, they may operate on the DOM, and they may override the values that you pass to them.

```javascript
// Impure functions
function square(x){
  updateXInDatabase(x);
  return x * x;
}
function squareAll(items){
  for (let i = 0; i < items.length; i++) {
    items[i] = square(items[i]);
  }
}
```

This is going to be an important distinction because some of the functions that you're going to write in Redux have to be pure, and you need to be mindful of that.

[>>> 04. The Reducer Function](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/04)