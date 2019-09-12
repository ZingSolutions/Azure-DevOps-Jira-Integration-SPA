import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ParsingInfo from './Components/ParsingInfo';
import NotFound from './Components/NotFound';
import Typography from '@material-ui/core/Typography';

function App() {
    return(
        <Router>
            <div>
                <Switch>
                    <Route path='/:prefix/:prid/:token' component={ParsingInfo}></Route>
                    <Route component={NotFound}></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
