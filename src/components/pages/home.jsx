import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import Layout from '../../containers/layout';
import Card from '../card';
import ImgPropTypes from '../../prop-types/img';

const renderRealArticle = (article) => (
  <figure key={article.url} className="home__real-article">
    {article.urlToImage && (
      <a
        href={article.url}
        rel="noopener noreferrer"
        target="_blank"
        className="home__real-article__img-wrapper"
      >
        <img lazy="true" alt={article.title} src={article.urlToImage} />
      </a>
    )}
    <figcaption>
      {article.sourceName && (
        <a href={article.url} rel="noopener noreferrer" target="_blank">
          <p>{article.sourceName}</p>
        </a>
      )}
      <a href={article.url} rel="noopener noreferrer" target="_blank">
        <h5>{article.title}</h5>
      </a>
    </figcaption>

    <style jsx>
      {`
        .home__real-article {
          margin-bottom: 1rem;
          overflow: hidden;
        }

        .home__real-article img {
          width: 100%;
        }

        .home__real-article a {
          display: block;
          font-size: 12px;
          margin-bottom: 0.5rem;
        }

        .home__real-article h5 {
          font-size: 16px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;

        }

        .home__real-article__img-wrapper {
          margin-bottom: 0.5rem;
          padding-bottom: calc(1080 / 1920 * 100%);
          position: relative;
          width: 100%;
        }

        .home__real-article__img-wrapper img {
          height: 100%;
          left: 0;
          object-fit: cover;
          position: absolute;
          top: 0;
          width: 100%;
        }
      `}
    </style>
  </figure>
);

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

          {articles.map((article) => (
            <figure key={article.id} className="home__main-content__main__figure">
              <a className="home__main-content__main__figure__image-wrapper" href={article.slug}>
                {article.featuredImage && article.featuredImage.fluid && (
                <Img
                  alt={article.title}
                  fluid={article.featuredImage.fluid}
                />
                )}
              </a>

              <a className="home__main-content__main__figure__tags" href={article.slug}>
                {article.tags[0]}
              </a>

              <figcaption className="home__main-content__main__figure__title">
                <a href={article.slug}>
                  {article.title}
                </a>
              </figcaption>

              <a
                href={article.slug}
                className="home__main-content__main__figure__overview"
              >
                {article.overview}
              </a>
              <div className="home__main-content__main__figure__clear" />
            </figure>
          ))}
        </Card>
      </main>

      <aside className="main__secondary main__secondary--a">
        {realArticlesA.map(renderRealArticle)}
      </aside>

      <aside className="main__secondary main__secondary--b">
        {realArticlesB.map(renderRealArticle)}
      </aside>
    </div>

    <style jsx>
      {`
        .home {
          display: grid;
          grid-template-areas: "a" "m" "sa" "sb";
          grid-template-columns: 1fr;
          grid-template-rows: auto auto auto auto;
        }

        .home__advertisement {
          align-items: center;
          background-color: #eff2f5;
          display: flex;
          grid-area: a;
          justify-content: center;
          padding: 1rem;
        }

        .home__advertisement :global(.gatsby-image-wrapper) {
          margin: 0 auto;
          max-width: 700px;
          width: 100%;
        }

        .home__main {
          grid-area: m;
          padding: 1rem;
        }

        .home__main-content__main__figure {
          padding-top: 1rem;
        }

        .home__main-content__main__figure__clear {
          clear: both;
        }

        .home__main-content__main__figure__image-wrapper {
          float: left;
          width: 40%;
        }

        .home__main-content__main__figure__image-wrapper :global(.gatsby-image-wrapper) {
          margin-right: 0.5rem;
        }

        .home__main-content__main__figure__tags {
          display: inline-block;
          min-width: 60%;
          font-size: 12px;
          margin-bottom: 0.5em;
        }

        .home__main-content__main__figure__title {
          min-width: 60%;
          font-size: 18px;
          margin-bottom: 0.5em;
        }

        .home__main-content__main__figure__overview {
          display: inline;
          white-space: pre-line;
        }

        .main__secondary {
          padding: 1rem;
          min-width: 0;
        }

        .main__secondary--a {
          grid-area: sa;
        }

        .main__secondary--b {
          grid-area: sb;
        }

        @media (min-width: 600px) {
          .home {
            grid-template-areas: "a a" "sa m" "sa sb";
            grid-template-columns: 0.6fr 1.4fr;
            grid-template-rows: auto auto auto;
          }
        }

        @media (min-width: 900px) {
          .home {
            grid-template-areas: "a a a" "sa m sb" "sa m sb";
            grid-template-columns: 0.7fr 1.6fr 0.7fr;
            grid-template-rows: auto auto auto;
          }

          .home__main-content__main__figure__image-wrapper {
            width: 30%;
          }

          .home__main-content__main__figure__tags {
            min-width: 70%;
          }

          .home__main-content__main__figure__title {
            min-width: 70%;
          }
        }
      `}
    </style>
  </Wrapper>
);

const realArticlePropType = PropTypes.shape({
  sourceName: PropTypes.string,
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
  articles: [],
  realArticlesA: [],
  realArticlesB: [],
  wrapper: Layout,
};

export default Home;
