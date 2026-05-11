import React from 'react';

interface LoadMoreProps {
  loadMore: () => void;
  page: number;
}

class LoadMore extends React.Component<LoadMoreProps> {
  render() {
    return (
      <button onClick={this.props.loadMore} className="search-button load-more-button">
        Load Next Page
      </button>
    );
  }
}

export default LoadMore;
