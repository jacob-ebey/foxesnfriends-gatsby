import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Home from '../components/pages/home';
import ImgPropTypes from '../prop-types/img';

const IndexPage = ({
  data: {
    page: {
      frontmatter: {
        mainAdvertisement: {
          childImageSharp: {
            fluid: mainAdvertisement,
          },
        },
      },
    },
    articles: { edges: allArticles },
    realArticles,
  },
}) => {
  const featuredArticle = React.useMemo(() => {
    const {
      fields: {
        slug,
      },
      frontmatter: {
        title,
        overview,
        featuredimage: {
          childImageSharp: featuredImage,
        },
      },
    } = allArticles[0].node;

    return {
      slug,
      title,
      overview,
      featuredImage,
    };
  }, [allArticles]);

  const articles = React.useMemo(() => allArticles.slice(1).map(({
    node: {
      id,
      fields: {
        slug,
      },
      frontmatter: {
        title,
        overview,
        tags,
        featuredimage: {
          childImageSharp: featuredImage,
        },
      },
    },
  }) => ({
    id,
    slug,
    title,
    overview,
    tags,
    featuredImage,
  })), [allArticles]);

  const [realArticlesA, realArticlesB] = React.useMemo(() => {
    const transformed = realArticles.map(({
      source: {
        name: sourceName,
      },
      title,
      description,
      url,
      urlToImage,
    }) => ({
      sourceName,
      title,
      description,
      url,
      urlToImage,
    }));
    const i = Math.floor(transformed.length / 2);
    return [
      transformed.slice(0, i),
      transformed.slice(i + 1),
    ];
  }, [realArticles]);

  return (
    <Home
      mainAdvertisement={mainAdvertisement}
      featuredArticle={featuredArticle}
      articles={articles}
      realArticlesA={realArticlesA}
      realArticlesB={realArticlesB}
    />
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
                }),
              }),
            }).isRequired,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }),

    realArticles: PropTypes.arrayOf(
      PropTypes.shape({
        source: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        url: PropTypes.string.isRequired,
        urlToImage: PropTypes.string,
      }).isRequired,
    ).isRequired,
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
      limit: 20
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
              }
            }
          }
        }
      }
    }

    realArticles {
      source {
        name
      }
      title
      description
      url
      urlToImage
    }
  }
`;
