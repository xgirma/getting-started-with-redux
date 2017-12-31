const Counter = ({count, onIncrement, onDecrement}) => (
    <div style={{fontSize:45}}>
      <h1>{count}</h1>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </div>
);