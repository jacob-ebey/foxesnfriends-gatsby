import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from './header';

import './global.scss';
import './layout.scss';

const Layout = ({
  title,
  description,
  brandIcon,
  stocks,
  headerHtml,
  children,
}) => (
  <>
    <Helmet>
      <title>{`${title}`}</title>
      <meta name="description" content={`${description}`} />
    </Helmet>
    <div className="top">
      <Header brandIcon={brandIcon} stocks={stocks} html={headerHtml} />

      <main>{children}</main>
    </div>

    {/* TODO: Add footer back <footer className="footer"
        dangerouslySetInnerHTML={{
          __html: footer.html
        }}
      /> */}
  </>
);

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  brandIcon: PropTypes.string.isRequired,
  headerHtml: PropTypes.string.isRequired,
  stocks: PropTypes.shape({
    apple: PropTypes.number.isRequired,
    microsoft: PropTypes.number.isRequired,
    facebook: PropTypes.number.isRequired,
  }).isRequired,
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
