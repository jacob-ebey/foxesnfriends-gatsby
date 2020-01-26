function validateImgFixed(img, prop = 'fixed') {
  return !!img && !!img.childImageSharp && !!img.childImageSharp[prop];
}

export default validateImgFixed;
