import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";
import RoutingHandler from './Components/RoutingHandler';
import Typography from '@material-ui/core/Typography';

function App() {
    return(
        <Router>
            <Route path='/:prefix/:prid/:token' component={RoutingHandler}></Route>
        </Router>
    );
}

export default App;
