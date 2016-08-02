import React from 'react';
import 'es6-promise';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {createHashHistory} from 'history';
import ReactDOM from 'react-dom';
import Home from './home/Home.js';

const history = createHashHistory({
  queryKey: false
});

import './app.less';

const docReady = require('exports?docReady!./lib/docready/docready');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      app: {
        platform: 'browser'
      }
    };
  }

  render() {
    return (
      <div className="full-height">
        {this.props.children}
      </div>
    );
  }
};



const routes = (
  <Route name="app" path="/" component={App}>
    <IndexRoute component={Home} />
    <Route name="home" path="/home" component={Home}/>
  </Route>
);

docReady(function() {
  ReactDOM.render(<Router history={history}>{routes}</Router>, document.getElementById('root'))
});
