import React, {Component} from 'react';
import Users from './Users';
import {Route, NavLink} from 'react-router-dom';

class App extends Component {
  render(){
    return (
      <div>
        <h2>Acme Users</h2>
        <ul className="nav nav-tabs">
          <li className="nav-item"><NavLink exact to ="/" className="nav-link">Home</NavLink></li>
          <li className="nav-item"><NavLink exact to="/users" className="nav-link">Users</NavLink></li>
        </ul>
        <Route exact path="/users" component={Users}/>
        <Route path="/users/:idx" render={({match, history}) => <Users idx={match.params.idx} history={history}/>}/>
        <Route exact path="/" render={() => <h3>Welcome Home!</h3>}/>
      </div>
    )
  }
};

export default App;
