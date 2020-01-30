import React from 'react';

function useFluidImage(imgSource) {
  const [result, setResult] = React.useState(null);

  React.useEffect(() => {
    let canceled = false;

    if (imgSource) {
      const img = new Image();
      img.src = imgSource;
      img.addEventListener('load', () => {
        if (canceled) {
          return;
        }

        const aspectRatio = img.width / img.height;

        setResult({
          childImageSharp: {
            fluid: {
              aspectRatio,
              src: imgSource,
              srcSet: `${imgSource} ${img.width}w`,
              sizes: `(max-width: ${img.width}px) 100vw, ${img.width}px`,
            },
          },
        });
      });
    }

    return () => {
      canceled = true;
    };
  }, [imgSource]);

  return result;
}

export default useFluidImage;
