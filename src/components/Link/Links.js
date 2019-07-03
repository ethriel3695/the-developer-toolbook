import React from 'react';
import { Link } from 'gatsby';

const Links = props => (
  <Link {...props} style={props.style}>
    {props.children}
  </Link>
);

export default Links;
