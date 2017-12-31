const mapStateToProps = ({count}) => ({
  count: count
});

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement() {
      dispatch(handleIncrement())
    },
    onDecrement() {
      dispatch(handleDecrement())
    }
  }
};

const CounterContainer = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Counter);