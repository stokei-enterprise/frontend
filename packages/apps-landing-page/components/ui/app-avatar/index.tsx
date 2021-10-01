import {
  Image as ChakraImage,
  ImageProps as ChakraImageProps
} from '@chakra-ui/react';
import React from 'react';

export const AppImage: React.FC<ChakraImageProps> = (props) => {
  return (
    <ChakraImage
      size="sm"
      //loading="lazy"
      fallbackSrc="/no-image.png"
      {...props}
    />
  );
};
