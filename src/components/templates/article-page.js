import React from "react";
import Img from "gatsby-image";
import {
  Email,
  Facebook,
  Pinterest,
  Reddit,
  Twitter
} from "react-sharingbuttons";
import "react-sharingbuttons/dist/main.css";

import Card from "../card";

import "./article-page.scss";

const ArticlePageTemplate = ({
  data: {
    article: {
      html,
      fields: { slug },
      frontmatter: { title, date, tags, featuredimage }
    },
    relatedArticles,
    site: {
      siteMetadata: { siteUrl }
    }
  }
}) => {
  console.log(featuredimage);
  const firstRelated =
    relatedArticles &&
    relatedArticles.edges &&
    relatedArticles.edges.length > 0 &&
    relatedArticles.edges[0].node;
  const firstRelatedTag =
    tags &&
    firstRelated &&
    firstRelated.frontmatter.tags &&
    firstRelated.frontmatter.tags.find(t => tags.includes(t));

  const url = siteUrl + slug;
  const origin = siteUrl;

  return (
    <div className="article-page">
      <div className="article-page__body">
        <div className="article-page__header">
          {firstRelatedTag && (
            <span>
              <a href={firstRelated.fields.slug}>{firstRelatedTag}</a>
            </span>
          )}
          {date && (
            <span>
              <strong>Published</strong> {date}
            </span>
          )}
        </div>

        <article className="article-page__article">
          <h1>{title}</h1>

          <div className="article-page__share-icons">
            <Facebook url={url} />
            <Email subject={title} url={url} />
            <Reddit url={url} />
            <Pinterest
              shareText={title}
              mediaSrc={
                featuredimage &&
                origin + featuredimage.childImageSharp.fluid.src
              }
              url={url}
            />
            <Twitter shareText={title} url={url} />
          </div>

          {featuredimage && <Img fluid={featuredimage.childImageSharp.fluid} />}

          <div
            dangerouslySetInnerHTML={{
              __html: html
            }}
          />
        </article>
      </div>

      {relatedArticles && relatedArticles.edges.length > 0 && (
        <div className="article-page__related-articles">
          <aside>
            {relatedArticles && relatedArticles.edges.length > 0 && (
              <Card title="Related Articles">
                {relatedArticles.edges.map(({ node: article }) => (
                  <div
                    key={article.id}
                    className="article-page__related-article"
                  >
                    <a href={article.fields.slug}>
                      <Img
                        alt={article.frontmatter.title}
                        fluid={
                          article.frontmatter.featuredimage.childImageSharp
                            .fluid
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
            )}
          </aside>
        </div>
      )}
    </div>
  );
};

export default ArticlePageTemplate;
