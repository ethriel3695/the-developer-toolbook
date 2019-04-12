import React, { Component } from 'react';
import Layout from '../components/layout';
import LoadingProgress from '../components/Progress/LoadingProgress';
import { handleAuthentication } from '../../src/store/actions/index';

class Callback extends Component {

    componentDidMount() {
        handleAuthentication();
    }
    render () {
        return (
        <Layout>
            <div>
                <LoadingProgress />
            </div>
        </Layout>
        )
    }
}

export default Callback;