import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

import Hamburger from './icons/hamburger';

import './layout.scss';

const Layout = ({ children }) => {
  const {
    site: {
      metadata: { title, description },
    },
    brandIcon: { publicURL: brandIcon },
    stocks,
    header,
    // TODO: Add footer back
    // footer
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
    <>
      <Helmet>
        <title>{`${title}`}</title>
        <meta name="description" content={`${description}`} />
      </Helmet>
      <div className="top">
        <header role="banner" className="header">
          <input
            className="hamburger-input"
            id="hamburger"
            name="hamburger"
            type="checkbox"
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="hamburger" htmlFor="hamburger" aria-label="Menu">
            <Hamburger height="32px" width="32px" />
          </label>
          {/* <label htmlFor="hamburger" className="header-overlay" /> */}

          <div className="header__logo">
            <img alt="Logo" src={brandIcon} />
          </div>

          <div
            className="header__main"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: header.html,
            }}
          />
          <div className="header__secondary">
            <ul>
              <li className="header__callout">
                <span>Markets</span>
              </li>
              <li>
                <span>
                  <strong>Apple</strong>
                  {' '}
$
                  {stocks.apple}
                </span>
              </li>
              <li>
                <span>
                  <strong>Microsoft</strong>
                  {' '}
$
                  {stocks.microsoft}
                </span>
              </li>
              <li>
                <span>
                  <strong>Facebook</strong>
                  {' '}
$
                  {stocks.facebook}
                </span>
              </li>
            </ul>
          </div>
        </header>

        <main>{children}</main>
      </div>

      {/* <footer
        dangerouslySetInnerHTML={{
          __html: footer.html
        }}
      /> */}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
