import React, { useState } from "react";
import Image from "next/image";

interface RetryImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const RetryImage = ({ src, alt, width, height }: RetryImageProps) => {
  const [retryCount, setRetryCount] = useState(0);

  const handleImageError = () => {
    // Incrementa o contador de tentativas
    setRetryCount(retryCount + 1);

    // Tentativa de carregar a imagem novamente
    // if (retryCount < 3) {
    //   console.log(`Tentando carregar ${src} novamente...`);
    // } else {
    //   console.error(`Falha ao carregar ${src} após várias tentativas.`);
    // }
  };

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      onError={handleImageError}
    />
  );
};

export default RetryImage;
