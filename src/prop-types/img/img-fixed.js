import PropTypes from 'prop-types';

export default PropTypes.shape({
  base64: PropTypes.string,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string.isRequired,
});
