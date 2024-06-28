import api from "@/api/axios";
import { PhotosProps } from "@/types/photos";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PhotoDetail = () => {
  const router = useRouter();
  const { photoId } = router.query;
  const [photo, setPhoto] = useState<PhotosProps | null>(null);

  const getPhoto = async () => {
    try {
      const response = await api.get(`/photos/${photoId}`);
      setPhoto(response.data);
    } catch (error) {
      console.log("Erro ao carregas as fotos", error);
    }
  };

  useEffect(() => {
    if (photoId) {
      getPhoto();
    }
  }, [photoId]);

  if (!photo) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <Head>
        <title>Axios | {photo.title}</title>
      </Head>
      <main>
        <Image width={600} height={600} src={photo.url} alt={photo.title} />
        <h1>{photo.title}</h1>
      </main>
    </>
  );
};

export default PhotoDetail;
