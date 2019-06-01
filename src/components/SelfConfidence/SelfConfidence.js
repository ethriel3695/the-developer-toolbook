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

const SelfConfidence = () => (
  <div>
    <SEO title="Self Confidence" />
    <Grid container>
      <Grid item sm={12}>
        <h1 style={pageStyles.textCenter}>SELF CONFIDENCE FORMULA</h1>
      </Grid>
      <Grid item sm={12}>
        <ol>
        <li>
        I know that I have the ability to achieve the object of my Definite Purpose in life. Therefore I demand of myself persistent, continuous action towards its attainment, and I here and now promise to take such action!
        </li>
        <li>
        I realize the dominating thoughts of my mind reproduce themselves in outward, physical action and transform themselves into physical reality. Therefore I am concentrating my thoughts for 30 minutes daily of envisioning who I want to be, thereby creating in my mind a clear and mental picture of me!
        </li>
        <li>
        I know through the principle of autosuggestion that any desire I persistently hold in my mind will eventually seek expression through some practical means of attaining the object. Therefore I am devoting 10 minutes daily to demanding of myself the development of self confidence!
        </li>
        <li>
        I have clearly written down a description of my Definite Chief Aim in life. I am committed to continue until I have the self confidence for its attainment!
        </li>
        <li>
        I fully realize wealth and position are real and reality when built upon truth and justice. Therefore I am committed to engage in transactions which benefit all whom the transactions affect. I am succeeding in attracting to myself the forces I want to use and the cooperation of other people! I am empowering others to serve me because of my willingness and desire to serve others. I share love to encourage love, joy, peace, trust and unity for all humanity because I know these positive emotions bring me success! I inspire others to believe in me because I believe in them and in myself. I sign my name to this formula as a commitment to live this statement every day because I am my word!!! I commit this to memory and repeat it aloud once a day with full Knowing that I am influencing my thoughts and actions so that I am self reliant and successful!
        </li>
        <div>I [Insert Name] commit on [Insert Full Date] to this statement and vow to give it everything I have!</div>
        </ol>
      </Grid>
    </Grid>
  </div>
)

export default SelfConfidence;
