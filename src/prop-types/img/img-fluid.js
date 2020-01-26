import PropTypes from 'prop-types';

export default PropTypes.shape({
  base64: PropTypes.string,
  aspectRatio: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string.isRequired,
  sizes: PropTypes.string.isRequired,
});
