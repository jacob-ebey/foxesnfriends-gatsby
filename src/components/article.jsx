import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import ImgPropTypes from '../prop-types/img';
import './real-article.scss';

const Article = ({
  slug,
  title,
  tag,
  image,
}) => (
  <figure key={slug} className="real-article">
    {image && (
      <Link
        to={slug}
      >
        <Img alt={title} fluid={image} />
      </Link>
    )}
    <figcaption>
      {tag && (
        <Link to={slug}>
          <p>{tag}</p>
        </Link>
      )}
      <Link to={slug}>
        <h5>{title}</h5>
      </Link>
    </figcaption>
  </figure>
);

Article.propTypes = {
  slug: PropTypes.string.isRequired,
  tag: PropTypes.string,
  title: PropTypes.string.isRequired,
  image: ImgPropTypes.fluid,
};

Article.defaultProps = {
  tag: null,
  image: null,
};

export default Article;
