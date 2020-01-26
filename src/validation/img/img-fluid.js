function validateImgFluid(img, prop = 'fluid') {
  return !!img && !!img.childImageSharp && !!img.childImageSharp[prop];
}

export default validateImgFluid;
