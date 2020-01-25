import React from "react";
import Helmet from "react-helmet";

import Layout from "../components/layout";
import ArticlePageTemplate from "../components/templates/article-page";

const ArticlePage = ({ data }) => {
  const {
    article: {
      fields: { slug },
      frontmatter: { title, overview, featuredimage }
    },
    site: {
      siteMetadata: { siteUrl }
    }
  } = data;

  const url = siteUrl + slug;

  return (
    <Layout>
      <Helmet>
        <title>{`${title}`}</title>
        <meta name="description" content={`${overview}`} />

        <meta name="og:url" content={url} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={overview} />
        {featuredimage &&
          featuredimage.childImageSharp &&
          featuredimage.childImageSharp.fluid && (
            <meta
              name="og:image"
              content={siteUrl + featuredimage.childImageSharp.fluid.src}
            />
          )}
        <meta name="og:type" content="website" />

        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={overview} />
        {featuredimage &&
          featuredimage.childImageSharp &&
          featuredimage.childImageSharp.fluid && (
            <meta
              name="twitter:image"
              content={siteUrl + featuredimage.childImageSharp.fluid.src}
            />
          )}
        <meta name="twitter:card" content="summary" />
      </Helmet>

      <ArticlePageTemplate data={data} />
    </Layout>
  );
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
