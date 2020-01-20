import React from "react";
import Helmet from "react-helmet";
import Img from "gatsby-image";

import Layout from "../components/layout";

import "./article-page.scss";

const ArticlePage = ({ data: { article } }) => {
  console.log(article);
  return (
    <Layout>
      <Helmet>
        <title>{`${article.frontmatter.title}`}</title>
        <meta name="description" content={`${article.frontmatter.overview}`} />
      </Helmet>

      <article className="article">
        <h1>{article.frontmatter.title}</h1>

        {article.frontmatter.featuredimage && (
          <Img fluid={article.frontmatter.featuredimage.childImageSharp.fluid} />
        )}

        <div
          dangerouslySetInnerHTML={{
            __html: article.html
          }}
        />
      </article>
    </Layout>
  );
};

export default ArticlePage;

export const pageQuery = graphql`
  query ArticlePage($id: String!) {
    article: markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
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
  }
`;
