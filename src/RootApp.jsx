import React from 'react';

import JSONPlaceholderComponent from './JSONPlaceholderComponent';

class RootApp extends React.Component {
  render() {
    console.log('render');

    return (
      <JSONPlaceholderComponent />
    )
  }
}

export default RootApp;
