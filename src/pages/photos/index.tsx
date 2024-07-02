// Imports
import api from "@/api/axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { GetStaticProps } from "next";

// Props
import { PhotosProps } from "@/types/apiProps";

// Styles
import styles from "./Photos.module.css";

// Components
import MainContentContainer from "@/components/MainContentContainer";
import GridContentContainer from "@/components/GridContentContainer";
import TitlePage from "@/components/TitlePage";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import ShowNumContents from "@/components/ShowNumContents";
import LoadingScreen from "@/components/Loading";

interface PhotosPageProps {
  photos: PhotosProps[];
}

export const Photos = ({ photos }: PhotosPageProps) => {
  const [visiblePhotos, setVisiblePhotos] = useState<PhotosProps[]>([]);
  const [photosToShow, setPhotosToShow] = useState<number>(30);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setVisiblePhotos(photos.slice(0, photosToShow));
    setIsLoading(false);
  }, [photos, photosToShow]);

  const loadMorePhotos = () => {
    setLoadingMore(true);
    setPhotosToShow((prev) => prev + 30);
    setLoadingMore(false);
  };

  if (isLoading) {
    return <LoadingScreen>Carregando Fotos...</LoadingScreen>;
  }

  return (
    <>
      <Head>
        <title>Axios | Fotos</title>
        <meta name="description" content="Listagem de Fotos" />
      </Head>

      <MainContentContainer>
        <TitlePage>Fotos</TitlePage>

        <ShowNumContents
          visibleCount={visiblePhotos.length}
          totalCount={photos.length}
          componentName="Fotos"
        />

        <GridContentContainer>
          {visiblePhotos.map((photo) => (
            <Link
              href={`/photo/${photo.id}`}
              key={photo.id}
              className={styles.photo}
            >
              <h2 className={styles.photo_title}>{photo.title}</h2>
              <Image
                width={150}
                height={150}
                src={photo.thumbnailUrl}
                alt={`Imagem de ${photo.title}`}
                className={styles.photo_small_img}
              />
            </Link>
          ))}
        </GridContentContainer>

        {photosToShow < photos.length && (
          <Button onClick={loadMorePhotos} disabled={loadingMore}>
            {loadingMore ? "Carregando" : "Ver mais"}
          </Button>
        )}
      </MainContentContainer>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await api.get<PhotosProps[]>("/photos");
    const photos = response.data;

    return {
      props: {
        photos,
      },
    };
  } catch (error) {
    console.error("Não foi possível carregar as fotos", error);

    return {
      props: {
        photos: [],
      },
    };
  }
};

export default Photos;
