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
import Article from '../article';
import RealArticle from '../real-article';

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
    featuredimagesrc,
  },
  relatedArticles,
  realArticles,
  children,
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
          && <Img alt={title} fluid={featuredimage.childImageSharp.fluid} />}
        {featuredimagesrc && <img alt={title} src={featuredimagesrc} />}

        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />

        {children}

        <div id="disqus_thread" className="article-page__comments" />
      </article>

      {relatedArticles && relatedArticles.length > 0 && (
        <aside className="article-page__related-articles">
          {relatedArticles && relatedArticles.length > 0 && relatedArticles.map((article) => (
            <Article
              key={article.id}
              slug={article.slug}
              title={article.title}
              tag={article.tags[0]}
              image={
                ImgValidation.fluid(article.featuredimage)
                  && article.featuredimage.childImageSharp.fluid
              }
            />
          ))}
        </aside>
      )}

      {realArticles && realArticles.length > 0 && (
        <aside className="article-page__real-articles">
          {realArticles.map(RealArticle)}
        </aside>
      )}
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
    tags: PropTypes.arrayOf(PropTypes.string.isRequired),
    featuredimage: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: ImgPropTypes.fluid,
      }),
    }),
    featuredimagesrc: PropTypes.string,
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
  realArticles: PropTypes.arrayOf(
    PropTypes.shape({
      sourceName: PropTypes.string,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      url: PropTypes.string.isRequired,
      urlToImage: PropTypes.string,
    }),
  ),
  children: PropTypes.node,
};

ArticlePageTemplate.defaultProps = {
  comments: true,
  relatedArticles: null,
  realArticles: null,
  children: null,
};

export default ArticlePageTemplate;
