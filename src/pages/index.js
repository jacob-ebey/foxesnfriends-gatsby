import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import Card from "../components/card";

import "./home.scss";

const IndexPage = ({
  data: {
    articles: { edges: allArticles }
  }
}) => {
  const featuredArticle = React.useMemo(() => allArticles[0].node, [
    allArticles
  ]);
  const articles = React.useMemo(() => allArticles.slice(1), [allArticles]);

  return (
    <Layout>
      <div className="home">
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
                      <Img
                        className="home__new-article__desktop-image"
                        alt={article.frontmatter.title}
                        fixed={
                          article.frontmatter.featuredimage.childImageSharp.fixed
                        }
                      />
                      <Img
                        className="home__new-article__mobile-image"
                        alt={article.frontmatter.title}
                        fixed={
                          article.frontmatter.featuredimage.childImageSharp.fixedMobile
                        }
                      />
                    </a>
                    <figcaption>
                      <a href={article.fields.slug}>
                        <p>{article.frontmatter.tags[0]}</p>
                      </a>
                      <a href={article.fields.slug}>
                        <h5>{article.frontmatter.title}</h5>
                      </a>
                      <a href={article.fields.slug} className="home__new-article__description">
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

export default IndexPage;

export const pageQuery = graphql`
  query IndexPage {
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
