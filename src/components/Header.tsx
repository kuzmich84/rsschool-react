import React from 'react';
import BoundaryButtonTest from './BoundaryButtonTest';

class Header extends React.Component {
  render() {
    return (
      <>
        <div className="header-content">
          <h1>Movie Search</h1>
          <BoundaryButtonTest />
        </div>
        <hr />
      </>
    );
  }
}

export default Header;
