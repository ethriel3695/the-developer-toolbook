import React from 'react';

import Grid from '@material-ui/core/Grid';
// import Layout from '../layout';
import SEO from '../seo';

const pageStyles = {
  textCenter: {
    display: 'flex',
    justifyContent: 'center'
  }
}

const Commitment = () => (
  <div>
    <SEO title="Commitment" />
    <Grid container>
      <Grid item sm={12}>
        <h1 style={pageStyles.textCenter}>Commitment</h1>
      </Grid>
      <Grid item sm={12}>
        <ol>
        <li>
        I work on the Developer Toolbook every single day and I give this everything I have until the last possible
        moment and this is my choice and commitment!
        </li>
        <li>
        I am in top peak physical condition and I am running a 5k in June and I give this everything I have until the last possible
        moment and this is my choice and commitment!
        </li>
        </ol>
      </Grid>
    </Grid>
  </div>
)

export default Commitment;
