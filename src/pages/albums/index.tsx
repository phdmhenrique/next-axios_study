// pages/albums/index.tsx
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";

// Styles
import styles from "./Albums.module.css";

// Components
import Title from "@/components/TitlePage";
import MainContentContainer from "@/components/MainContentContainer";
import GridContentContainer from "@/components/GridContentContainer";

// Utils
import api from "@/api/axios";
import { AlbumsProps } from "@/types/apiProps";
import ShowNumContents from "@/components/ShowNumContents";
import { useEffect, useState } from "react";
import Button from "@/components/Button";

interface AlbumsPageProps {
  albums: AlbumsProps[];
}

const Albums = ({ albums }: AlbumsPageProps) => {
  const [visibleAlbums, setVisibleAlbums] = useState<AlbumsProps[]>([]);
  const [albumsToShow, setalbumsToShow] = useState<number>(30);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    setVisibleAlbums(albums.slice(0, albumsToShow));
  }, [albums, albumsToShow]);

  const loadMoreAlbums = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setalbumsToShow((prev) => prev + 30);
      setLoadingMore(false);
    }, 500);
  };

  return (
    <>
      <Head>
        <title>Axios | Albums</title>
      </Head>
      <MainContentContainer>
        <Title>Álbums</Title>
        <ShowNumContents
          visibleCount={visibleAlbums.length}
          totalCount={albums.length}
          componentName="Álbums"
        />
        <GridContentContainer>
          {visibleAlbums.map((album) => (
            <Link
              href={`/album/${album.id}`}
              key={album.id}
              className={styles.album}
            >
              <h1>{album.title}</h1>
              <p>{album.id}</p>
            </Link>
          ))}
        </GridContentContainer>

        {albumsToShow < albums.length && (
          <Button onClick={loadMoreAlbums} disabled={loadingMore}>
            {loadingMore ? "Carregando" : "Ver Mais"}
          </Button>
        )}
      </MainContentContainer>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await api.get<AlbumsProps[]>("/albums");
    const albums = response.data; // Limita a 15 elementos para exemplo

    return {
      props: {
        albums,
      },
      revalidate: 60 * 5,
    };
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return {
      props: {
        albums: [],
      },
    };
  }
};

export default Albums;
