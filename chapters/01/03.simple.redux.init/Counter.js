class Counter extends React.Component {
  render(){
    const { count, onIncrement, onDecrement } = this.props;
    return (
      <div style={{fontSize:45}}>
        <h1>{count}</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
      </div>
    )
  };
}