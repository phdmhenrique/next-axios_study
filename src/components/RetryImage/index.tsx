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
  const [srcToShow, setSrcToShow] = useState(src);

  const handleImageError = () => {
    if (retryCount < 3) {
      setRetryCount(retryCount + 1);
      setSrcToShow(`${src}?retry=${retryCount + 1}`);
    } else {
      setSrcToShow("/images/ecat-fallback.png");
    }
  };

  return (
    <Image
      src={srcToShow}
      alt={alt}
      width={width}
      height={height}
      onError={handleImageError}
    />
  );
};

export default RetryImage;
