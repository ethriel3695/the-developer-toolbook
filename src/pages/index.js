import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import HomepageGrid from '../components/Grid/HomepageGrid';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <HomepageGrid />
  </Layout>
)

export default IndexPage
