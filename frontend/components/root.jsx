import React from 'react';
import App from "./app";
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';


class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    )
  }
}

export default Root;