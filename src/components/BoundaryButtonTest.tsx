import React from 'react';

class BoundaryButtonTest extends React.Component {
  state = {
    isError: false,
  };
  handleClick = () => {
    this.setState({ isError: true });
  };
  render() {
    if (this.state.isError) {
      throw new Error('I crashed!!!');
    }
    return (
      <button className="boundary-button" onClick={this.handleClick}>
        Error Boundary Test
      </button>
    );
  }
}

export default BoundaryButtonTest;
