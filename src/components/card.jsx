import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import './card.scss';

const Card = ({
  title, imgProps, href, className, children, ...rest
}) => {
  const Component = href ? 'a' : 'div';

  return (
    <div className={`card ${className || ''}`} {...rest}>
      {imgProps && (
        <Component className="card__img" href={href}>
          <Img alt={title} {...imgProps} />
        </Component>
      )}
      <div className="card--body">
        <Component className="card__title" href={href}>
          <h3>{title}</h3>
        </Component>
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  imgProps: PropTypes.object,
  children: PropTypes.node,
};

Card.defaultProps = {
  href: null,
  className: null,
  imgProps: null,
  children: null,
};

export default Card;
