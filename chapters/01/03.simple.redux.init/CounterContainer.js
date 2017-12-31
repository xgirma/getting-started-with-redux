class CounterContainer extends React.Component{
  state = {
    count: 0,
  };

  handleIncrement = () => {
    this.setState({
      count: this.state.count + 1
    })
  };

  handleDecrement = () => {
    this.setState({
      count: this.state.count - 1
    })
  };

  render(){
    const { count } = this.state;
    return (
      <Counter
        count={count}
        onIncrement={this.handleIncrement}
        onDecrement={this.handleDecrement}/>
    )
  };
}