# 22. Extracting Container Components (FilterLink)

[<<< 21. Extracting Container Components (FilterLink)](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/21)

Learn **how to avoid the boilerplate of passing the props down the intermediate components by introducing more container components**.

The components, such as AddTodo, the TodoList, the Todo itself, the Footer, and the FilterLink, `they don't dispatch actions`. They call their callbacks in the props. They are only responsible for the looks but not for the behavior.

> The downside of this approach is that I have to pass a lot of props down the tree even when the intermediate components don't really use them.

For example, the **FilterLink** needs to know the `currentFilter` so that it can choose a different appearance when it is active.

```javascript
const FilterLink = ({filter, currentFilter, children, onClick}) => {
  if(filter === currentFilter) {
    return <span>{children}</span>
  }
  return (
    <a href='#'
       onClick={ event => {
         event.preventDefault();
         onClick(filter);
       }}
    >
      {children}
    </a>
  )
};
```

However, in order to receive the `currentFilter`, it has to be passed down from the top. This is why the Footer has to accept `visibilityFilter` as a `prop`, so it can pass it down as a `currentFilter` to the `FilterLink`.

```javascript
const Footer = ({ visibilityFilter, onFilterClick }) => (
  <p>
    Show:{' ['}
    <FilterLink
      filter='SHOW_ALL'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    > All </FilterLink>{']  ['}
    
    // ...
  </p>
);
```

> In a way, this breaks encapsulation because the parent components need to know too much about what data the child components need. 

To solve this, we're going to extract a few more container components, just like we extracted the presentation components in the previous lesson.

**[1]** The first component I'm going to refactor is the **Footer component**.

```html
<Footer
  visibilityFilter={visibilityFilter}
  onFilterClick={filter =>
    store.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter
    })}
/>
```

Currently the Footer component accepts two props -- the `visibilityFilter`, and the on `onFilterClick`. **But it doesn't actually use either of them**. `It just passes them down` to the filter link. This seems like a good opportunity for simplification.

`We can only do this because we know that the Footer component doesn't care about the values of these props`. They only exist to be passed down to the **FilterLink** that cares about them.

```html
<FilterLink 
  filter='SHOW_ALL'
  currentFilter={visibilityFilter}
  onClick={onFilterClick}
/>
```

I am removing the props definition, and I'm removing these props from the **FilterLink** usage. It might start to seem a lot like the the code before separating the presentational component. However, what I want to do here is a little bit different.

before
```javascript
const Footer = ({ visibilityFilter, onFilterClick }) => (
  <p>
    Show:{' ['}
    <FilterLink
      filter='SHOW_ALL'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    > All </FilterLink>{']  ['}

    <FilterLink
      filter='SHOW_ACTIVE'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    > Active </FilterLink>{']  ['}

    <FilterLink
      filter='SHOW_COMPLETED'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    > Completed </FilterLink>{']'}
  </p>
);
```

after
```javascript
const Footer = () => (
  <p>
    Show:{' ['}
    <FilterLink
      filter='SHOW_ALL'
    > All </FilterLink>{']  ['}

    <FilterLink
      filter='SHOW_ACTIVE'
    > Active </FilterLink>{']  ['}

    <FilterLink
      filter='SHOW_COMPLETED'
    > Completed </FilterLink>{']'}
  </p>
);
```

The FilterLink does not currently specify the behavior for clicking on the link. It also needs the currentFilter to tell whether it should be rendered as active.

> Therefore, it's a bit dishonest to say that `FilterLink` is a presentational component because it is inseparable from its behavior. The only reasonable reaction to clicking on it is setting the `visibilityFilter` by dispatching an action.

This is why I'm changing it to a different presentational component I'm going to call, Link I will create another FilterLink component as a container that uses it for rendering. The Link component doesn't know anything about the filter. It only accepts the active prop, and it calls its own click handler. It is only concerned with rendering.

```javascript
const Link = ({ active, children, onClick }) => {
  if (active) { return <span>{children}</span>}

  return(
    <a href='#'
       onClick={e => {
         e.preventDefault();
         onClick();
       }}
    >
      {children}
      </a>
  )
};
```

However, I'm also creating another component, called `FilterLink` It is going to be a `class` this time that is going to render the `Link` with the current data from this store. It's going to read the component `props`, and it's going to read the `state`. But I don't mean react state. I mean the Redux store state it gets by calling, `store.getState`

```javascript

```





[>>> 23. Extracting Container Components (VisibleTodoList, AddTodo)](https://github.com/xgirma/getting-started-with-redux/tree/master/chapters/22)