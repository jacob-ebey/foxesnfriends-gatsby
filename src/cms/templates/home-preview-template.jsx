import React from 'react';
import PropTypes from 'prop-types';

import Home from '../../components/pages/home';
import Layout from '../../components/layout';
import useFluidImage from '../../hooks/use-fluid-image';

const HomePreviewTemplate = ({ entry }) => {
  const mainAdvertisementSrc = entry.getIn(['data', 'mainAdvertisement']);

  const featuredImage = useFluidImage('/img/preppers-convert-to-islam.jpg');
  const mainAdvertisement = useFluidImage(mainAdvertisementSrc);

  return featuredImage ? (
    <Home
      wrapper={({ children }) => (
        <Layout
          title="Test title"
          description="Test description"
          brandIcon="/img/brand-icon.svg"
          headerHtml={`
            <h1><a href="#">Foxes n Friends</a></h1>
          `}
          stocks={{
            apple: 100,
            facebook: 200,
            microsoft: 300,
          }}
        >
          {children}
        </Layout>
      )}
      mainAdvertisement={mainAdvertisement && mainAdvertisement.childImageSharp.fluid}
      featuredArticle={{
        slug: '#',
        title: 'Test Article Title',
        overview: 'Featured article overview would go here. It is normally longer and takes up some space.',
        featuredImage: featuredImage.childImageSharp,
      }}
    />
  ) : null;
};

HomePreviewTemplate.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func.isRequired,
  }).isRequired,
};

export default HomePreviewTemplate;
