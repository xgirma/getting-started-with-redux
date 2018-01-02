# 06. Store Methods: getState(), dispatch(), and subscribe()

[05. Writting a Counter Reducer with Tests](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/05)

We will learn about the Redux Store and demonstrate how its three methods let us implement a counter application.

I added Redux to our application as a script tag from CDNJS. This is the UMG build, so **it exports a single global variable called Redux**, with a capital R. In real applications, I suggest you to use npm instead and a module bundler like webpack or Browserify, but the UMG build will suffice for our example.

I'm going to need just a single function from Redux called **createStore**.
<img width="1107" alt="screen shot 2018-01-02 at 12 05 21 am" src="https://user-images.githubusercontent.com/5876481/34477679-baa6f336-ef50-11e7-84f1-2e58bde442af.png">

```javascript
const { createStore } = Redux;
// var createStore = Redux.createStore;
// import { createStore } from 'redux';
```

**STORE binds together the three principles** of Redux. It holds the current application's state object. It lets you dispatch actions. When you create it, you need to specify the reducer that tells how state is updated with actions.

1. State tree: In Redux weather your app is simple or complex your state are going to represent the `whole state` of your application as a `single JavaScript object` aka state tree.

2. Action: `State tree` is `read only`. _You cannot modify or write to it_. Instead, anytime `you want to change the state`, you need to **dispatch an action**.

3. Reducer: To **describe state mutations**, you have to write a function that takes the `previous state` of the app, the `action being dispatched`, and `returns the next state` of the app**. **This function has to be pure**. This function is called the `Reducer`.

In this example, we're calling `createStore` with `counter` as the `reducer` that manages the state updates. This store has three important methods.

```javascript
import { createStore } from 'redux';
const store = createStore(counter);
```

## getState
```javascript
import { createStore } from 'redux';
const store = createStore(counter);
console.log(store);
```
<img width="1152" alt="screen shot 2018-01-02 at 12 17 36 am" src="https://user-images.githubusercontent.com/5876481/34477915-6b284650-ef52-11e7-80bc-be4f95eaeb5a.png">

```javascript
import { createStore } from 'redux';
import { counter } from './reducer';

const store = createStore(counter);
console.log(store.getState());  // 0
```

The first method of this store is called `getState`. It retrieves the current state of the Redux store. If we were on this, we're going to see `0` because this is the initial state of our application.

## dispatch
The second and the most commonly used store method is called `dispatch`. It `lets you dispatch actions` to change the state of your application. If we log this store state after dispatch, we're going to see that it has changed.

```javascript
import { createStore } from 'redux';
import { counter } from './reducer';

const store = createStore(counter);

store.dispatch({ type: 'INCREMENT' });
console.log(store.getState());  // 1
```

## subscribe
Of course, always log into the console gets boring, so we're actually going to render something to the body with the help of the third Redux store method, called **subscribe**. It lets you register a callback that the Redux store will call any time an action has been dispatched, so that you can update the UI of your application. It will reflect the current application state.

```javascript
import { createStore } from 'redux';
import { counter } from './reducer';

const store = createStore(counter);

store.subscribe(() => {
  document.body.innerText = store.getState();
});

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});
```

## render
I'm being very naive now. I'm not using React or anything. I'm just rendering the counter into the document body. Any time the body is clicked, I'm going to dispatch an action to increment this counter.
```javascript
const { createStore } = Redux;
const store = createStore(counter);

const render = () => {
  document.body.innerText = store.getState();
};

store.subscribe(() => {
  document.body.innerText = store.getState();
});

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});
```

If you pay close attention, you will notice that the `initial state, the 0, was not rendered`. This is because I'm `rendering inside the subscribe callback`, but it doesn't actually fire the very first time. So I extract this logic into render method. I subscribe the render method to this store. I also `call it once to render the initial state`. Now it renders the 0, and the click increments the counter.

```javascript
const { createStore } = Redux;
const store = createStore(counter);

const render = () => {
  document.body.innerText = store.getState();
};

render(); // to render the initial state

store.subscribe(render);

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});
```

This is our first working Redux application. :feet: :feet: :feet:

[07. Implementing Store from Scratch](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/07)
