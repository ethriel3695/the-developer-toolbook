import React from 'react';

import Grid from '@material-ui/core/Grid';
import Layout from '../components/layout';
import SEO from '../components/seo';

const pageStyles = {
  textCenter: {
    display: 'flex',
    justifyContent: 'center'
  }
}

const Faith = () => (
  <Layout>
    <SEO title="Faith" />
    <Grid container>
      <Grid item sm={12}>
        <h1 style={pageStyles.textCenter}>FAITH</h1>
      </Grid>
      <Grid item sm={12}>
        <ol>
        <li>
        {'FAITH is the “eternal elixir” which gives life, power and action to the impulse of thought! (Read this once, twice, three and even a fourth time!)'}
        </li>
        <li>
        {'FAITH is the starting point of all accumulation of riches!'}
        </li>
        <li>
        {'FAITH is the basis of all “miracles” and mysteries that cannot be analyzed by the rules of science!'}
        </li>
        <li>
        {'FAITH is the only known antidote to FAILURE!'}
        </li>
        <li>
        {'FAITH is the element, the “chemical” which, when mixed with meditation, gives one direct communication with Infinite Intelligence.'}
        </li>
        <li>
        {'FAITH is the element that transforms the ordinary vibration of thought, created by the finite mind of man, into the spiritual equivalent.'}
        </li>
        <li>
        {'FAITH is the only agency through which the cosmic force of Infinite Intelligence can be harnessed and used.'}
        </li>
        </ol>
      </Grid>
    </Grid>
  </Layout>
)

export default Faith;
