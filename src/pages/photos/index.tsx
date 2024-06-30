// Imports
import api from "@/api/axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Props
import { PhotosProps } from "@/types/photos";

// Styles
import styles from "./Photos.module.css";

// Components
import MainContentContainer from "@/components/MainContentContainer";
import GridContentContainer from "@/components/GridContentContainer";
import TitlePage from "@/components/TitlePage";
import { GetStaticProps } from "next";

interface PhotosPageProps {
  photos: PhotosProps[];
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await api.get<PhotosProps[]>("/photos");
    const photos = response.data.slice(0, 30);

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

export const Photos = ({ photos }: PhotosPageProps) => {
  return (
    <>
      <Head>
        <title>Axios | Fotos</title>
        <meta name="description" content="Listagem de Fotos" />
      </Head>

      <MainContentContainer>
        <TitlePage>Fotos</TitlePage>
        <GridContentContainer>
          {photos.length === 0 ? (
            <p>Carregando...</p>
          ) : (
            <>
              {photos.map((photo) => (
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
            </>
          )}
        </GridContentContainer>

        {/* <div className={styles.pagination}>
          <button onClick={handlePreviousPage} disabled={page === 1}>
            Anterior
          </button>
          <button onClick={handleNextPage}>Próxima</button>
        </div> */}
      </MainContentContainer>
    </>
  );
};

export default Photos;
