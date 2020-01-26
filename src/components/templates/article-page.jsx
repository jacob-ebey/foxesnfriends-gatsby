import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import {
  Email,
  Facebook,
  Pinterest,
  Reddit,
  Twitter,
} from 'react-sharingbuttons';
import 'react-sharingbuttons/dist/main.css';

import useComments from '../../hooks/use-comments';
import ImgPropTypes from '../../prop-types/img';
import ImgValidation from '../../validation/img';

import Card from '../card';
import './article-page.scss';

const ArticlePageTemplate = ({
  comments,
  siteUrl,
  article: {
    html,
    slug,
    title,
    date,
    tags,
    featuredimage,
  },
  relatedArticles,
}) => {
  const firstRelated = relatedArticles
    && relatedArticles.length > 0
    && relatedArticles[0];
  const firstRelatedTag = tags
    && firstRelated
    && firstRelated.tags
    && firstRelated.tags.find((t) => tags.includes(t));

  const url = siteUrl + slug;
  const origin = siteUrl;

  useComments(slug, comments);

  return (
    <div className="article-page">
      <div className="article-page__body">
        <div className="article-page__header">
          {firstRelatedTag && (
          <span>
            <a href={firstRelated.slug}>{firstRelatedTag}</a>
          </span>
          )}
          {date && (
          <span>
            <strong>Published</strong>
            {' '}
            {date}
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
                ImgValidation.fluid(featuredimage)
                  ? origin + featuredimage.childImageSharp.fluid.src
                  : undefined
              }
              url={url}
            />
            <Twitter shareText={title} url={url} />
          </div>

          {ImgValidation.fluid(featuredimage)
            && <Img fluid={featuredimage.childImageSharp.fluid} />}

          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
        </article>
      </div>

      {relatedArticles && relatedArticles.length > 0 && (
      <div className="article-page__related-articles">
        <aside>
          {relatedArticles && relatedArticles.length > 0 && (
          <Card title="Related Articles">
            {relatedArticles.map((article) => (
              <div
                key={article.id}
                className="article-page__related-article"
              >
                {ImgValidation.fluid(article.featuredimage) && (
                  <a href={article.slug}>
                    <Img
                      alt={article.title}
                      fluid={article.featuredimage.childImageSharp.fluid}
                    />
                  </a>
                )}
                <p>
                  <a href={article.slug}>
                    {article.title}
                  </a>
                </p>
              </div>
            ))}
          </Card>
          )}
        </aside>
      </div>
      )}

      <div id="disqus_thread" className="article-page__comments" />
    </div>
  );
};

ArticlePageTemplate.propTypes = {
  comments: PropTypes.bool,
  siteUrl: PropTypes.string.isRequired,
  article: PropTypes.shape({
    html: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    featuredimage: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: ImgPropTypes.fluid,
      }),
    }),
  }).isRequired,
  relatedArticles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      featuredimage: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fluid: ImgPropTypes.fluid,
        }),
      }),
    }),
  ),
};

ArticlePageTemplate.defaultProps = {
  comments: true,
  relatedArticles: null,
};

export default ArticlePageTemplate;
