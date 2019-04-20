import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import HeaderAppBar from './HeaderAppBar/HeaderAppBar'
import './layout.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <HeaderAppBar siteTitle={data.site.siteMetadata.title}/>
        <div
          style={{
            margin: `0 auto`,
            // maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 60,
          }}
        >
          {children}
          <footer>
            © {new Date().getFullYear()}
            {` `}
              The Developer Toolbook
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
