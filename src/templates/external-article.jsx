import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import marked from 'marked';
import moment from 'moment';

import Layout from '../containers/layout';
import ArticlePageTemplate from '../components/templates/article-page';
import ImgPropTypes from '../prop-types/img';

const ExternalArticlePage = ({
  data: {
    site: {
      siteMetadata: { siteUrl },
    },
    relatedArticles,
    realArticles,
  },
  pageContext: {
    article: {
      slug,
      title,
      description,
      publishedAt,
      content,
      url: articleUrl,
      urlToImage,
    },
  },
}) => {
  const url = React.useMemo(() => siteUrl + slug, [siteUrl, slug]);

  const mappedArticles = React.useMemo(() => relatedArticles.edges.map(({ node: article }) => ({
    id: article.id,
    html: article.html,
    slug: article.fields.slug,
    title: article.frontmatter.title,
    tags: article.frontmatter.tags,
    featuredimage: article.frontmatter.featuredimage,
  })));

  const mappedRealArticles = React.useMemo(() => realArticles.slice(0, 10).map(({
    source: {
      name: sourceName,
    },
    slug: aslug,
    title: atitle,
    description: adescription,
    url: aurl,
    urlToImage: aurlToImage,
  }) => ({
    sourceName,
    slug: aslug,
    title: atitle,
    description: adescription,
    url: aurl,
    urlToImage: aurlToImage,
  })), [realArticles]);

  return (
    <Layout>
      <Helmet>
        <title>{`${title}`}</title>
        <meta name="description" content={`${description || title}`} />

        <meta name="og:url" content={url} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description || title} />
        {urlToImage && (
          <meta
            name="og:image"
            content={urlToImage}
          />
        )}
        <meta name="og:type" content="website" />

        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description || title} />
        {urlToImage && (
          <meta
            name="twitter:image"
            content={urlToImage}
          />
        )}
        <meta name="twitter:card" content="summary" />
      </Helmet>

      <ArticlePageTemplate
        siteUrl={siteUrl}
        article={{
          date: moment(publishedAt).format('D/M/YYYY'),
          html: marked(content),
          slug,
          title,
          featuredimagesrc: urlToImage,
        }}
        relatedArticles={mappedArticles}
        realArticles={mappedRealArticles}
      >
        <a href={articleUrl} rel="noopener noreferrer" target="_blank">Read More</a>
      </ArticlePageTemplate>
    </Layout>
  );
};

ExternalArticlePage.propTypes = {
  pageContext: PropTypes.shape({
    article: PropTypes.shape({
      source: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      url: PropTypes.string.isRequired,
      urlToImage: PropTypes.string,
      publishedAt: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,

  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        siteUrl: PropTypes.string,
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
    }).isRequired,

    realArticles: PropTypes.arrayOf(
      PropTypes.shape({
        source: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        url: PropTypes.string.isRequired,
        urlToImage: PropTypes.string,
      }).isRequired,
    ).isRequired,
  }).isRequired,
};

export default ExternalArticlePage;

export const pageQuery = graphql`
  query ExternalArticlePage {
    site {
      siteMetadata {
        siteUrl
      }
    }

    relatedArticles: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "article-page" } } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 10
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

    realArticles {
      source {
        name
      }
      slug
      title
      description
      url
      urlToImage
    }
  }
`;
