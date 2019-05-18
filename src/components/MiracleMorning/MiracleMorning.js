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

const MiracleMorning = () => (
  <div>
    <SEO title="Miracle Morning" />
    <Grid container>
      <Grid item sm={12}>
        <h1 style={pageStyles.textCenter}>Miracle Morning S.A.V.E.R.S</h1>
        <h4 style={pageStyles.textCenter}>The principle of the S.A.V.E.R.S is
        to wake up early and start taking control and bring purpose to your mornings!</h4>
      </Grid>
      <Grid item sm={12}>
        <ol>
        <li>
        <strong>S - Silence:</strong> Meditate and clear your space and energy. However you do this is perfect
        there is no correct way to meditate. The important part is to relax and experience peace.
        </li>
        <li>
        <strong>A - Affirmations:</strong> The affirmations will only work if they have purpose and emotion behind them. 
        Affirmations that state "I am rich now" do not have any action and are just words.
        A better affirmation would be "I have $100,000.00 in my bank account by December 19, 20**" and
        I am committed to spending 30 minutes every single day [insert action here] until I achieve my results.
        </li>
        <li>
        <strong>V - Visualization:</strong> The visualization step is where you envision yourself in the life you want and 
        the goals you are stating with your affirmations. Visualize yourself in your new house, or driving your
        new car, or with $100,000.00 in your bank account.
        </li>
        <li>
        <strong>E - Exercise:</strong> This is self explanitory. Spend some time taking care of your body and trust yourself
        on how much or how little exercise you want to do.
        </li>
        <li>
        <strong>R - Reading:</strong> This step is crucial because reading leads to knowledge and perspective and opens up
        new thoughts. Reading expands your mind and inspires creativity.
        </li>
        <li>
        <strong>S - Scribing:</strong> This step is journaling and journaling can look many different ways. You can write 
        in a journal traditionally, brainstorm ideas, task manage, answer questions about yourself through 
        introspection and reflection, creating affirmations, and infinite other posibilities.
        </li>
        </ol>
      </Grid>
    </Grid>
  </div>
)

export default MiracleMorning;
