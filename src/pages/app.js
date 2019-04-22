import React from 'react';
import { Router } from '@reach/router';
import Layout from '../components/layout';

import PrivateRoute from '../components/Routes/PrivateRoute';
import HomepageGrid from '../components/Grid/HomepageGrid';

import AutoSuggestion from '../components/AutoSuggestion/AutoSuggestion';
import SelfConfidence from '../components/SelfConfidence/SelfConfidence';
import SelfImage from '../components/SelfImage/SelfImage';
import Commitment from '../components/Commitment/Commitment';
import Faith from '../components/Faith/Faith';
import PublicRoute from '../components/Routes/PublicRoute';

const App = () => (
    <Layout>
        <Router>
            {/* <div> */}
                {/*<Route path="/" render={(props) => <IndexPage auth={auth} {...props} />} />*/}
                <PublicRoute path="/" exact component={HomepageGrid} />
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