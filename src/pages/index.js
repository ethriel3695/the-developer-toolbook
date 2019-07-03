import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import HomepageGrid from '../components/Grid/HomepageGrid';

export default function IndexPage() {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <HomepageGrid />
    </Layout>
  );
}
