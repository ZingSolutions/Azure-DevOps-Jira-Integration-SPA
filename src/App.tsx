import React from 'react';
import { BrowserRouter as Router, Switch, Route, RouteComponentProps } from 'react-router-dom';
import PRDetail from './components/PRDetail';
import PRDetailProps from './models/PRDetailProps';
import NoMatch from './components/NoMatch';
import Callback from './components/Callback';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/auth/callback/" component={Callback} />
          />
          <Route exact path="/:groupId/:pullRequestId/:token" render={
            (rp: RouteComponentProps<PRDetailProps>) => (
              <PRDetail {...rp.match.params} /> 
            )}
          />
          <Route component={NoMatch}/>
        </Switch>
      </Router>      
    </div>
  );
}

export default App;
