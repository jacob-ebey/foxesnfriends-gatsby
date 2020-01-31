import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import './card.scss';

const Card = ({
  title, imgProps, href, to, className, children, ...rest
}) => {
  // eslint-disable-next-line no-nested-ternary
  const Component = href ? 'a' : (to ? Link : 'div');

  return (
    <div className={`card ${className || ''}`} {...rest}>
      {imgProps && (
        <Component className="card__img" {...{ [to ? 'to' : 'href']: href }}>
          <Img alt={title} {...imgProps} />
        </Component>
      )}
      <div className="card__body">
        {title && (
          <Component className="card__title" href={href}>
            <h3>{title}</h3>
          </Component>
        )}
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  to: PropTypes.string,
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  imgProps: PropTypes.object,
  children: PropTypes.node,
};

Card.defaultProps = {
  title: null,
  href: null,
  to: null,
  className: null,
  imgProps: null,
  children: null,
};

export default Card;
