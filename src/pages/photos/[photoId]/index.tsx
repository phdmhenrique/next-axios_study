// Import
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Styles
import styles from "../Photos.module.css";

// Utils
import api from "@/api/axios";
import { PhotosProps } from "@/types/photos";

// Components
import MainContentContainer from "@/components/MainContentContainer";
import TitlePage from "@/components/TitlePage";

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
      <MainContentContainer>
        <TitlePage>{photo.title}</TitlePage>
        <Image
          width={600}
          height={600}
          src={photo.url}
          alt={photo.title}
          className={styles.photo_img}
        />
      </MainContentContainer>
    </>
  );
};

export default PhotoDetail;
