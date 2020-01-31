import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../../containers/layout';
import ImgPropTypes from '../../prop-types/img';
import Card from '../card';
import RealArticle from '../real-article';

import './home.scss';

const Home = ({
  mainAdvertisement,
  featuredArticle,
  articles,
  realArticlesA,
  realArticlesB,
  wrapper: Wrapper,
}) => (
  <Wrapper>
    <div className="home">
      {mainAdvertisement && (
        <div className="home__advertisement">
          <Img
            alt="Advertisement"
            fluid={mainAdvertisement}
          />
        </div>
      )}

      <main className="home__main">
        <Card
          className="home__main-content__main"
          imgProps={featuredArticle.featuredImage}
          title={featuredArticle.title}
          href={featuredArticle.slug}
        >
          <p>{featuredArticle.overview}</p>

          {articles && articles.map((article) => (
            <figure key={article.id} className="home__main-content__main__figure">
              <Link className="home__main-content__main__figure__image-wrapper" to={article.slug}>
                {article.featuredImage && article.featuredImage.fluid && (
                <Img
                  alt={article.title}
                  fluid={article.featuredImage.fluid}
                />
                )}
              </Link>

              <Link className="home__main-content__main__figure__tags" to={article.slug}>
                {article.tags[0]}
              </Link>

              <figcaption className="home__main-content__main__figure__title">
                <Link to={article.slug}>
                  {article.title}
                </Link>
              </figcaption>

              <Link
                to={article.slug}
                className="home__main-content__main__figure__overview"
              >
                {article.overview}
              </Link>
              <div className="home__main-content__main__figure__clear" />
            </figure>
          ))}
        </Card>
      </main>

      {realArticlesA && realArticlesA.length > 0 && (
        <aside className="main__secondary main__secondary--a">
          {realArticlesA.map(RealArticle)}
        </aside>
      )}

      {realArticlesB && realArticlesB.length > 0 && (
        <aside className="main__secondary main__secondary--b">
          {realArticlesB.map(RealArticle)}
        </aside>
      )}
    </div>
  </Wrapper>
);

const realArticlePropType = PropTypes.shape({
  sourceName: PropTypes.string,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  url: PropTypes.string.isRequired,
  urlToImage: PropTypes.string,
}).isRequired;

Home.propTypes = {
  mainAdvertisement: ImgPropTypes.fluid,
  featuredArticle: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    featuredImage: PropTypes.shape({
      fluid: ImgPropTypes.fluid.isRequired,
    }).isRequired,
  }).isRequired,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      featuredImage: PropTypes.shape({
        fluid: ImgPropTypes.fluid,
      }),
    }).isRequired,
  ),
  realArticlesA: PropTypes.arrayOf(realArticlePropType),
  realArticlesB: PropTypes.arrayOf(realArticlePropType),
  wrapper: PropTypes.func,
};

Home.defaultProps = {
  mainAdvertisement: null,
  articles: null,
  realArticlesA: null,
  realArticlesB: null,
  wrapper: Layout,
};

export default Home;
