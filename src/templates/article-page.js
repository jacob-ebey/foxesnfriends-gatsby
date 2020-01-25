import React from "react";
import Helmet from "react-helmet";

import Layout from "../components/layout";
import ArticlePageTemplate from "../components/templates/article-page";

const ArticlePage = ({ data }) => {
  const {
    article: {
      frontmatter: { title, overview }
    }
  } = data;

  return (
    <Layout>
      <Helmet>
        <title>{`${title}`}</title>
        <meta name="description" content={`${overview}`} />
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
