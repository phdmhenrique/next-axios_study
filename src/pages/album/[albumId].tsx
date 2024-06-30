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
import Button from "@/components/Button";
import ShowNumContents from "@/components/ShowNumContents";

interface AlbumProps {
  album: AlbumsProps;
  photos: PhotosProps[];
}

const Album = ({ album, photos }: AlbumProps) => {
  const [visibleAlbums, setVisibleAlbums] = useState<PhotosProps[]>(
    photos.slice(0, 9)
  );
  const [albumsToShow, setAlbumsToShow] = useState<number>(9);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const loadMorePhotos = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setAlbumsToShow((prev) => prev + 9);
      setVisibleAlbums(photos.slice(0, albumsToShow + 9));
      setLoadingMore(false);
    }, 500);
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
        <ShowNumContents
          visibleCount={visibleAlbums.length}
          totalCount={photos.length}
          componentName={`Àlbums dentro de ${album.title}`}
        />

        <GridContentContainer>
          {visibleAlbums.map((photo) => (
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
        {albumsToShow < photos.length && (
          <Button onClick={loadMorePhotos} disabled={loadingMore}>
            {loadingMore ? "Carregando" : "Ver Mais"}
          </Button>
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
