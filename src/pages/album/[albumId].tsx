// Imports
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React, { useState } from "react";

// Styles
import styles from "../albums/Albums.module.css";

// Utils
import { AlbumsProps, PhotosProps } from "@/types/apiProps";
import api from "@/api/axios";

// Components
import MainContentContainer from "@/components/MainContentContainer";
import TitlePage from "@/components/TitlePage";
import GridContentContainer from "@/components/GridContentContainer";
import RetryImage from "@/components/RetryImage";

interface AlbumProps {
  album: AlbumsProps;
  photos: PhotosProps[];
}

const Album = ({ album, photos }: AlbumProps) => {
  const [visiblePhotos, setVisiblePhotos] = useState<PhotosProps[]>(
    photos.slice(0, 9)
  );
  const [photosToShow, setPhotosToShow] = useState<number>(9);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const loadMorePhotos = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setPhotosToShow((prev) => prev + 9);
      setVisiblePhotos(photos.slice(0, photosToShow + 9));
      setLoadingMore(false);
    }, 500);
  };

  const handleLoadMoreClick = () => {
    loadMorePhotos();
  };

  if (!album) {
    return <p>Carregando Álbum...</p>;
  }

  return (
    <>
      <Head>
        <title>Axios | {album.title}</title>
      </Head>
      <MainContentContainer>
        <TitlePage>{album.title}</TitlePage>
        <GridContentContainer>
          {visiblePhotos.map((photo) => (
            <div key={photo.id} className={styles.photoCard}>
              <RetryImage
                src={photo.thumbnailUrl}
                alt={photo.title}
                width={150}
                height={150}
              />
              <p>{photo.title}</p>
            </div>
          ))}
        </GridContentContainer>
        {photosToShow < photos.length && (
          <button
            onClick={handleLoadMoreClick}
            disabled={loadingMore}
            className={styles.loadMoreButton}
          >
            {loadingMore ? "Carregando" : "Ver Mais"}
          </button>
        )}
      </MainContentContainer>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await api.get<AlbumsProps[]>("/albums");
    const albums = response.data;

    const paths = albums.map((album) => ({
      params: { albumId: album.id.toString() },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Erro ao buscar caminhos:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { albumId } = context.params!;

  try {
    const albumResponse = await api.get<AlbumsProps>(`/albums/${albumId}`);
    const photosResponse = await api.get<PhotosProps[]>(`/photos`, {
      params: { albumId },
    });

    return {
      props: {
        album: albumResponse.data,
        photos: photosResponse.data,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return {
      props: {
        album: null,
        photos: [],
      },
    };
  }
};

export default Album;
