// Imports
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

// Styles
import styles from "../Albums.module.css";

// Utils
import { AlbumsProps, PhotosProps } from "@/types/apiProps";
import api from "@/api/axios";

// Components
import MainContentContainer from "@/components/MainContentContainer";
import TitlePage from "@/components/TitlePage";
import GridContentContainer from "@/components/GridContentContainer";
import RetryImage from "@/components/RetryImage";

const Album = () => {
  const router = useRouter();
  const { albumId } = router.query;
  const [album, setAlbum] = useState<AlbumsProps | null>(null);
  const [photos, setPhotos] = useState<PhotosProps[]>([]);
  const [visiblePhotos, setVisiblePhotos] = useState<PhotosProps[]>([]);
  const [photosToShow, setPhotosToShow] = useState<number>(9);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const getAlbum = async () => {
    try {
      const albumResponse = await api.get<AlbumsProps>(`/albums/${albumId}`);
      setAlbum(albumResponse.data);

      const photosResponse = await api.get<PhotosProps[]>(`/photos`, {
        params: { albumId },
      });
      setPhotos(photosResponse.data);
      setVisiblePhotos(photosResponse.data.slice(0, photosToShow));
    } catch (error) {
      console.error("Não foi possível carregar o álbum ou as fotos", error);
    }
  };

  useEffect(() => {
    if (albumId) {
      getAlbum();
    }
  }, [albumId]);

  useEffect(() => {
    if (photos.length) {
      setVisiblePhotos(photos.slice(0, photosToShow));
    }
  }, [photos, photosToShow]);

  const loadMorePhotos = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setPhotosToShow((prev) => prev + 9);
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
        <GridContentContainer ref={containerRef}>
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

export default Album;
