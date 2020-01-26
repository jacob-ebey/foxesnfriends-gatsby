import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import moment from 'moment';

import ArticlePage from '../../components/templates/article-page';

const ArticlePreviewTemplate = ({ entry }) => {
  const title = entry.getIn(['data', 'title']);
  const overview = entry.getIn(['data', 'overview']);
  const featuredimagesrc = entry.getIn(['data', 'featuredimage']);
  const html = marked(entry.getIn(['data', 'body']) || '');

  let date = entry.getIn(['data', 'date']);
  if (date) {
    date = moment(date).format('D/M/YYYY');
  }

  const [featuredimage, setFeaturedimage] = React.useState(null);
  React.useEffect(() => {
    let canceled = false;

    if (featuredimagesrc) {
      const img = new Image();
      img.src = featuredimagesrc;
      img.addEventListener('load', () => {
        if (canceled) {
          return;
        }

        const aspectRatio = img.width / img.height;

        setFeaturedimage({
          childImageSharp: {
            fluid: {
              aspectRatio,
              src: featuredimagesrc,
              srcSet: `${featuredimagesrc} ${img.width}w`,
              sizes: `(max-width: ${img.width}px) 100vw, ${img.width}px`,
            },
          },
        });
      });
    }

    return () => {
      canceled = true;
    };
  }, [featuredimagesrc]);

  return (
    <ArticlePage
      comments={false}
      article={{
        html,
        slug: 'article/test-slug',
        title,
        overview,
        date,
        tags: ['Example Tag'],
        featuredimage,
      }}
      siteUrl={window.location.host}
    />
  );
};

ArticlePreviewTemplate.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func.isRequired,
  }).isRequired,
};

export default ArticlePreviewTemplate;
