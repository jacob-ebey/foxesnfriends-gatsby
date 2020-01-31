import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import './real-article.scss';

const RealArticle = ({
  slug,
  title,
  sourceName,
  urlToImage,
}) => (
  <figure key={slug} className="real-article">
    {urlToImage && (
      <Link
        to={slug}
        className="real-article__img-wrapper"
      >
        <img lazy="true" alt={title} src={urlToImage} />
      </Link>
    )}
    <figcaption>
      {sourceName && (
        <Link to={slug}>
          <p>{sourceName}</p>
        </Link>
      )}
      <Link to={slug}>
        <h5>{title}</h5>
      </Link>
    </figcaption>
  </figure>
);

RealArticle.propTypes = {
  slug: PropTypes.string.isRequired,
  sourceName: PropTypes.string,
  title: PropTypes.string.isRequired,
  urlToImage: PropTypes.string.isRequired,
};

RealArticle.defaultProps = {
  sourceName: null,
};

export default RealArticle;
