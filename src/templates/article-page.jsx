import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../containers/layout';
import ArticlePageTemplate from '../components/templates/article-page';
import ImgPropTypes from '../prop-types/img';
import ImgValidation from '../validation/img';

const ArticlePage = ({
  data: {
    article: {
      html,
      fields: { slug },
      frontmatter: {
        date,
        featuredimage,
        tags,
        title,
        overview,
      },
    },
    site: {
      siteMetadata: { siteUrl },
    },
    relatedArticles,
  },
}) => {
  const url = React.useMemo(() => siteUrl + slug, [siteUrl, slug]);

  const mappedArticles = React.useMemo(() => relatedArticles
    && relatedArticles.edges
    && relatedArticles.edges.map(({ node: article }) => ({
      id: article.id,
      html: article.html,
      slug: article.fields.slug,
      title: article.frontmatter.title,
      tags: article.frontmatter.tags,
      featuredimage: article.frontmatter.featuredimage,
    })));

  return (
    <Layout>
      <Helmet>
        <title>{`${title}`}</title>
        <meta name="description" content={`${overview}`} />

        <meta name="og:url" content={url} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={overview} />
        {ImgValidation.fluid(featuredimage) && (
          <meta
            name="og:image"
            content={siteUrl + featuredimage.childImageSharp.fluid.src}
          />
        )}
        <meta name="og:type" content="website" />

        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={overview} />
        {ImgValidation.fluid(featuredimage) && (
          <meta
            name="twitter:image"
            content={siteUrl + featuredimage.childImageSharp.fluid.src}
          />
        )}
        <meta name="twitter:card" content="summary" />
      </Helmet>

      <ArticlePageTemplate
        siteUrl={siteUrl}
        article={{
          date,
          html,
          featuredimage,
          slug,
          tags,
          title,
        }}
        relatedArticles={mappedArticles}
      />
    </Layout>
  );
};

ArticlePage.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        siteUrl: PropTypes.string,
      }).isRequired,
    }).isRequired,

    article: PropTypes.shape({
      html: PropTypes.string,
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }).isRequired,
      frontmatter: PropTypes.shape({
        date: PropTypes.string.isRequired,
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

    relatedArticles: PropTypes.shape({
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
  }).isRequired,
};

export default ArticlePage;

export const pageQuery = graphql`
  query ArticlePage($id: String!, $tags: [String]) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    article: markdownRemark(id: { eq: $id }) {
      id
      html
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
            fluid(maxWidth: 992) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    relatedArticles: allMarkdownRemark(
      filter: { id: { ne: $id }, frontmatter: { tags: { in: $tags } } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 6
    ) {
      edges {
        node {
          id
          html
          fields {
            slug
          }
          frontmatter {
            title
            tags
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 530) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
