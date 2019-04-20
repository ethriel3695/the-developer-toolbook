import React from 'react';
import { Router, Route } from '@reach/router';
import Layout from '../components/layout';

import PrivateRoute from '../components/Routes/PrivateRoutes';
import HomepageGrid from '../components/Grid/HomepageGrid';

import AutoSuggestion from '../components/AutoSuggestion/AutoSuggestion';
import SelfConfidence from '../components/SelfConfidence/SelfConfidence';
import SelfImage from '../components/SelfImage/SelfImage';
import Commitment from '../components/Commitment/Commitment';
import Faith from '../components/Faith/Faith';

const App = () => (
    <Layout>
        <Router>
            {/* <div> */}
                {/*<Route path="/" render={(props) => <IndexPage auth={auth} {...props} />} />*/}
                <Route path="/" exact component={HomepageGrid} />
                <PrivateRoute path="/app/auto-suggestion" component={AutoSuggestion} />
                <PrivateRoute path="/app/commitment" component={Commitment} />
                <PrivateRoute path="/app/faith" component={Faith} />
                <PrivateRoute path="/app/self-confidence" component={SelfConfidence} />
                <PrivateRoute path="/app/self-image" component={SelfImage} />
            {/* </div> */}
        </Router>
    </Layout>
)

export default App;