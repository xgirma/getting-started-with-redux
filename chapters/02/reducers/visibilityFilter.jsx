const visibilityFilter = (state = Filters.SHOW_ALL, action) => {
  if(action.type === SET_VISIBILITY_FILTER){
    return action.filter;
  }

  return state;
};