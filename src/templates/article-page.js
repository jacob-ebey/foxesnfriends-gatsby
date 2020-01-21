import React from "react";
import Helmet from "react-helmet";
import Img from "gatsby-image";
import {
  Email,
  Facebook,
  Pinterest,
  Reddit,
  Twitter
} from "react-sharingbuttons";
import "react-sharingbuttons/dist/main.css";

import Card from "../components/card";
import Layout from "../components/layout";

import "./article-page.scss";

const ArticlePage = ({ data: { article, relatedArticles } }) => {
  const firstRelated =
    relatedArticles.edges &&
    relatedArticles.edges.length > 0 &&
    relatedArticles.edges[0].node;
  const firstRelatedTag =
    article.frontmatter.tags &&
    firstRelated &&
    firstRelated.frontmatter.tags &&
    firstRelated.frontmatter.tags.find(t =>
      article.frontmatter.tags.includes(t)
    );

  return (
    <Layout>
      <Helmet>
        <title>{`${article.frontmatter.title}`}</title>
        <meta name="description" content={`${article.frontmatter.overview}`} />
      </Helmet>

      <div className="article-page">
        <div className="article-page__body">
          <div className="article-page__header">
            {firstRelatedTag && (
              <span>
                <a href={firstRelated.fields.slug}>{firstRelatedTag}</a>
              </span>
            )}
            {article.frontmatter.date && (
              <span>
                <strong>Published</strong> {article.frontmatter.date}
              </span>
            )}
          </div>

          <article className="article-page__article">
            <h1>{article.frontmatter.title}</h1>

            <div className="article-page__share-icons">
              <Facebook />
              <Email />
              <Reddit />
              <Pinterest />
              <Twitter />
            </div>

            {article.frontmatter.featuredimage && (
              <Img
                fluid={article.frontmatter.featuredimage.childImageSharp.fluid}
              />
            )}

            <div
              dangerouslySetInnerHTML={{
                __html: article.html
              }}
            />
          </article>
        </div>

        {relatedArticles && relatedArticles.edges.length > 0 && (
          <div className="article-page__related-articles">
            <Card title="Related Articles">
              {relatedArticles.edges.map(({ node: article }) => (
                <div key={article.id} className="article-page__related-article">
                  <a href={article.fields.slug}>
                    <Img
                      fluid={
                        article.frontmatter.featuredimage.childImageSharp.fluid
                      }
                    />
                  </a>
                  <p>
                    <a href={article.fields.slug}>
                      {article.frontmatter.title}
                    </a>
                  </p>
                </div>
              ))}
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ArticlePage;

export const pageQuery = graphql`
  query ArticlePage($id: String!, $tags: [String]) {
    article: markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(fromNow: true)
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
            date(fromNow: true)
            title
            overview
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
