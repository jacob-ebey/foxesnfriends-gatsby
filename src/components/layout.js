import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import Hamburger from "./icons/hamburger";

import "./layout.scss";

const Layout = ({ children }) => {
  const { header, footer } = useStaticQuery(graphql`
    {
      header: markdownRemark(frontmatter: { templateKey: { eq: "header" } }) {
        html
      }
      footer: markdownRemark(frontmatter: { templateKey: { eq: "footer" } }) {
        html
      }
    }
  `);

  return (
    <React.Fragment>
      <div className="top">
        <header role="banner" className="header">
          <input className="hamburger-input" id="hamburger" name="hamburger" type="checkbox" />
          <label
            className="hamburger"
            htmlFor="hamburger"
            aria-label="Menu"
          >
            <Hamburger height="32px" width="32px" />
          </label>
          {/* <label htmlFor="hamburger" className="header-overlay" /> */}

          <div
            dangerouslySetInnerHTML={{
              __html: header.html
            }}
          />
        </header>

        <main>{children}</main>
      </div>

      <footer
        dangerouslySetInnerHTML={{
          __html: footer.html
        }}
      />
    </React.Fragment>
  );
};

export default Layout;
