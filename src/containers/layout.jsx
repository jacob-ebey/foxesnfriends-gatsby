import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/layout';

const LayoutContainer = ({ children }) => {
  const {
    site: {
      metadata: { title, description },
    },
    brandIcon: { publicURL: brandIcon },
    stocks,
    header,
    footer,
  } = useStaticQuery(graphql`
    {
      site {
        metadata: siteMetadata {
          title
          description
        }
      }
      brandIcon: file(name: { eq: "brand-icon" }) {
        publicURL
      }
      stocks {
        apple
        microsoft
        facebook
      }
      header: markdownRemark(frontmatter: { templateKey: { eq: "header" } }) {
        html
      }
      footer: markdownRemark(frontmatter: { templateKey: { eq: "footer" } }) {
        html
      }
    }
  `);

  return (
    <Layout
      title={title}
      description={description}
      brandIcon={brandIcon}
      stocks={stocks}
      headerHtml={header.html}
      footerHtml={footer.html}
    >
      {children}
    </Layout>
  );
};

LayoutContainer.propTypes = {
  children: PropTypes.node,
};

LayoutContainer.defaultProps = {
  children: null,
};

export default LayoutContainer;
