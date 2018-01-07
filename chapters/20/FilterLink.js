const FilterLink = ({filter, currentFilter, children}) => {
  if(filter === currentFilter) {
    return <span>{children}</span>
  }
  return (
    <a href='#'
       onClick={ event => {
         event.preventDefault();
         store.dispatch({
           type: 'SET_VISIBILITY_FILTER',
           filter
         })
       }}
    >
      {children}
    </a>
  )
};


