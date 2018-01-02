const mapStateToProps = ({ value, nextTodoId }) => ({
  value,
  id: nextTodoId + 1,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onAddClick(value){
      dispatch(addTodo(value))
    }
  }
};
