import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import Layout from '../../containers/layout';
import Card from '../card';
import ImgPropTypes from '../../prop-types/img';

import './home.scss';

const Home = ({
  mainAdvertisement,
  featuredArticle,
  articles,
  wrapper: Wrapper,
}) => (
  <Wrapper>
    <div className="home">
      {mainAdvertisement && (
        <div className="home__main-advertisement">
          <Img
            className="home__main-advertisement__img"
            alt="Advertisement"
            fluid={mainAdvertisement}
          />
        </div>
      )}

      <div className="home__main-content">
        <Card
          imgProps={featuredArticle.featuredImage}
          title={featuredArticle.title}
          href={featuredArticle.slug}
        >
          <p>{featuredArticle.overview}</p>

          <div className="home__new-articles">
            {articles.map((article) => (
              <figure key={article.id} className="home__new-article">
                <div>
                  <a href={article.slug}>
                    {article.featuredImage && article.featuredImage.fixed && (
                      <Img
                        className="home__new-article__desktop-image"
                        alt={article.title}
                        fixed={
                          article.featuredImage.fixed
                        }
                      />
                    )}
                    {article.featuredImage && article.featuredImage.fixedMobile && (
                      <Img
                        className="home__new-article__mobile-image"
                        alt={article.title}
                        fixed={
                          article.featuredImage.fixedMobile
                        }
                      />
                    )}
                  </a>
                  <figcaption>
                    <a href={article.slug}>
                      <p>{article.tags[0]}</p>
                    </a>
                    <a href={article.slug}>
                      <h5>{article.title}</h5>
                    </a>
                    <a
                      href={article.slug}
                      className="home__new-article__description"
                    >
                      <p>{article.overview}</p>
                    </a>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </Card>
      </div>
    </div>
  </Wrapper>
);

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
        fixed: ImgPropTypes.fixed.isRequired,
        fixedMobile: ImgPropTypes.fixed.isRequired,
      }),
    }).isRequired,
  ).isRequired,
  wrapper: PropTypes.func,
};

Home.defaultProps = {
  mainAdvertisement: null,
  wrapper: Layout,
};

export default Home;
