import React from 'react';

import Grid from '@material-ui/core/Grid';
// import Layout from '../layout';
import SEO from '../seo';
import InfoIcon from '@material-ui/icons/Info';

const pageStyles = {
  textCenter: {
    display: 'flex',
    justifyContent: 'center'
  }
}

const Instruction = () => (
  <div>
    <SEO title="Welcome Instructions" />
    <Grid container>
      <Grid item sm={12}>
        <h1 style={pageStyles.textCenter}>Getting Started</h1>
        <h4 style={pageStyles.textCenter}>The purpose of this tool is to assist you in waking yourself
        up and realizing that you are able to do so much more than you think you can. Life is not
        about the cards you are dealt. It is your responsibility to create the life you want and this 
        tool will assist in realizing your true abilities!</h4>
      </Grid>
      <Grid item sm={12}>
        <strong>Self Confidence:</strong> is knowing what you can do, having belief
        you can achieve all your dreams, goals, ambitions, mission and loving who you are. <br/>
        This tool is an affirmation which you say daily with the purpose of empowering yourself with,
        belief, desire and love.
        <br/>
        <br/>
        <strong>Auto Suggestion:</strong> is the act of training your brain to view things differently
        and rewiring your brain to focus on a success and happiness mindset for whatever you desire. <br/>
        <span style={{marginLeft: '5em'}}>
          This tool allows for the creation, editing, completion and deletion of auto suggestion statements.
        </span>
        <ol>
          <li>Assign a title to your auto suggestion statement</li>
          <li>Fill out your auto suggestion statement and reference the sample card and the information icon<InfoIcon/> <br/> 
            next to the title for guidance on how to structure your auto suggestion statement
          </li>
        </ol>
        <strong>Miracle Equation:</strong> This is your current main mission in life which will have the most
        benefit on your character and on the rest of your life. There are many important goals, this mission 
        is different because it is what will fuel you to do things differently and live a life of purpose.
        <br/>
        <span style={{marginLeft: '5em'}}>
          This tool allows for the creation, editing, completion and deletion of miracle equation statements.
        </span>
        <ol>
          <li>Assign a title to your miracle equation statement</li>
          <li>Fill out your miracle equation statement and reference the sample card and the information icon<InfoIcon/> <br/> 
            next to the title for guidance on how to structure your miracle equation statement
          </li>
        </ol>
        <strong>Self Analysis:</strong> The best thing you can do for yourself is to take the time and perform
        an honest assessment of yourself and how you interact and live your life. This tool provides questions
        to ask yourself. The key is to be honest with yourself with the purpose of experiencing growth and 
        learning about yourself.
        <ol>
          <li>Select a question to answer</li>
          <li>The answer is your honest assessment of where you are currently at and your current beliefs</li>
          <li>The truth is what you can see about the situation when you look at it from a different perspective</li>
          <li>The last step is to make a commitment on what you are going to do about your current mindset and 
            how you are going to change it.
          </li>
        </ol>
        <strong>Miracle Morning:</strong> This tool is an explanation of a way to structure your morning 
        through meditation, affirmations, visualization, exercise, reading and journaling. You will be focused
        and at peace if you follow this morning routine, I guarantee it.<br/>
        <strong>NOTE:</strong> You do not have to practice this routine in the morning the goal is to wake up an hour
        earlier than you usually do and give yourself structure and purpose with your morning
        <br/>
        <br/>
        <strong>Meditation:</strong> will bring you peace and provide clarity in your life. The tool provides
        guides to three different meditations each for a different purpose. Meditation does not look a certain
        way so have fun and remember the overall goal is peace and clarity.
        <br/>
        <br/>
        <strong>7 Habits:</strong> These habits are a list of characteristics to strive for and choose for 
        yourself. Credit goes to <i>Stephen Covey</i> and his book <i>7 Habits of Highly Effective People</i>
        <br/>
        <br/>
      </Grid>
    </Grid>
  </div>
)

export default Instruction;
