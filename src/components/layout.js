import React from "react";
import Helmet from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

import Hamburger from "./icons/hamburger";

import "./layout.scss";

const Layout = ({ children }) => {
  const {
    site: {
      metadata: { title, description }
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

  console.log(brandIcon);

  return (
    <React.Fragment>
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
          <label className="hamburger" htmlFor="hamburger" aria-label="Menu">
            <Hamburger height="32px" width="32px" />
          </label>
          {/* <label htmlFor="hamburger" className="header-overlay" /> */}

          <div className="header__logo">
            <img alt="Logo" src={brandIcon} />
          </div>

          <div
            className="header__main"
            dangerouslySetInnerHTML={{
              __html: header.html
            }}
          />
          <div className="header__secondary">
            <ul>
              <li className="header__callout">
                <span>Markets</span>
              </li>
              <li>
                <span>
                  <strong>Apple</strong> ${stocks.apple}
                </span>
              </li>
              <li>
                <span>
                  <strong>Microsoft</strong> ${stocks.microsoft}
                </span>
              </li>
              <li>
                <span>
                  <strong>Facebook</strong> ${stocks.facebook}
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
    </React.Fragment>
  );
};

export default Layout;
