import React from 'react';
import PropTypes from 'prop-types';

import Hamburger from './icons/hamburger';

const Header = ({
  stocks,
  html,
  brandIcon,
}) => (
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
        __html: html,
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
);

Header.propTypes = {
  stocks: PropTypes.shape({
    apple: PropTypes.number.isRequired,
    microsoft: PropTypes.number.isRequired,
    facebook: PropTypes.number.isRequired,
  }).isRequired,
  html: PropTypes.string.isRequired,
  brandIcon: PropTypes.string.isRequired,
};

export default Header;
