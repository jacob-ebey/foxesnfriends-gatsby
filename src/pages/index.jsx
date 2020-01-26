import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';
import Card from '../components/card';
import ImgPropTypes from '../prop-types/img';
import ImgValidation from '../validation/img';

import './home.scss';

const IndexPage = ({
  data: {
    page: {
      frontmatter: { mainAdvertisement },
    },
    articles: { edges: allArticles },
  },
}) => {
  const featuredArticle = React.useMemo(() => allArticles[0].node, [
    allArticles,
  ]);
  const articles = React.useMemo(() => allArticles.slice(1), [allArticles]);

  return (
    <Layout>
      <div className="home">
        {ImgValidation.fluid(mainAdvertisement) && (
          <div className="home__main-advertisement">
            <Img
              className="home__main-advertisement__img"
              alt="Advertisement"
              fluid={mainAdvertisement.childImageSharp.fluid}
            />
          </div>
        )}
        <div className="home__main-content">
          <Card
            imgProps={featuredArticle.frontmatter.featuredimage.childImageSharp}
            title={featuredArticle.frontmatter.title}
            href={featuredArticle.fields.slug}
          >
            <p>{featuredArticle.frontmatter.overview}</p>

            <div className="home__new-articles">
              {articles.map(({ node: article }) => (
                <figure key={article.id} className="home__new-article">
                  <div>
                    <a href={article.fields.slug}>
                      {ImgValidation.fixed(article.frontmatter.featuredimage) && (
                        <Img
                          className="home__new-article__desktop-image"
                          alt={article.frontmatter.title}
                          fixed={
                            article.frontmatter.featuredimage.childImageSharp.fixed
                          }
                        />
                      )}
                      {ImgValidation.fixed(article.frontmatter.featuredimage, 'fixedMobile') && (
                        <Img
                          className="home__new-article__mobile-image"
                          alt={article.frontmatter.title}
                          fixed={
                            article.frontmatter.featuredimage.childImageSharp.fixedMobile
                          }
                        />
                      )}
                    </a>
                    <figcaption>
                      <a href={article.fields.slug}>
                        <p>{article.frontmatter.tags[0]}</p>
                      </a>
                      <a href={article.fields.slug}>
                        <h5>{article.frontmatter.title}</h5>
                      </a>
                      <a
                        href={article.fields.slug}
                        className="home__new-article__description"
                      >
                        <p>{article.frontmatter.overview}</p>
                      </a>
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      frontmatter: PropTypes.shape({
        mainAdvertisement: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            fluid: ImgPropTypes.fluid,
          }),
        }),
      }).isRequired,
    }).isRequired,

    articles: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            html: PropTypes.string,
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }).isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              overview: PropTypes.string.isRequired,
              tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
              featuredimage: PropTypes.shape({
                childImageSharp: PropTypes.shape({
                  fluid: ImgPropTypes.fluid,
                  fixed: ImgPropTypes.fixed,
                  fixedMobile: ImgPropTypes.fixed,
                }),
              }),
            }).isRequired,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }),
  }).isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPage {
    page: markdownRemark(frontmatter: { templateKey: { eq: "index" } }) {
      frontmatter {
        mainAdvertisement {
          childImageSharp {
            fluid(maxWidth: 728) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    articles: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "article-page" } } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 40
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "D/M/YYYY")
            title
            overview
            tags
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 768) {
                  ...GatsbyImageSharpFluid
                }
                fixed(width: 156, height: 88) {
                  ...GatsbyImageSharpFixed
                }
                fixedMobile: fixed(width: 88, height: 50) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`;
