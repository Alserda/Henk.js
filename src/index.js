import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import RootApp from './RootApp';

/* DOM element to render the application within */
const target = document.getElementById('app');


/**
 * Renders the main application.
 *
 * @param  Component  Instance of the RootApp component
 */
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    target
  );
};


/* Enable hot module replacement for components */
if (module.hot) {
  module.hot.accept('./RootApp', () => {
    const NextRootApp = require('./RootApp').default;
    render(RootApp);
  });
}

/* Render the application for the first time */
render(RootApp);
