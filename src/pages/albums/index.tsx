// pages/albums/index.tsx

import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";

// Styles
import styles from "./Albums.module.css";

// Components
import Button from "@/components/Button";
import Title from "@/components/TitlePage";
import MainContentContainer from "@/components/MainContentContainer";
import GridContentContainer from "@/components/GridContentContainer";

// Utils
import api from "@/api/axios";
import { AlbumsProps } from "@/types/albums";

interface AlbumsPageProps {
  albumsData: AlbumsProps[];
}

const Albums = ({ albumsData }: AlbumsPageProps) => {
  const [albums, setAlbums] = useState<AlbumsProps[]>(albumsData);

  useEffect(() => {
    setAlbums(albumsData);
  }, [albumsData]);

  return (
    <>
      <Head>
        <title>Axios | Albums</title>
      </Head>
      <MainContentContainer>
        <Title>Álbums</Title>
        <GridContentContainer>
          {albums.map((album) => (
            <div key={album.id} className={styles.album}>
              <h1>{album.title}</h1>
              <p>{album.id}</p>
              <Link href={`/album/${album.id}`}>
                <Button>Ver Detalhes</Button>
              </Link>
            </div>
          ))}
        </GridContentContainer>
      </MainContentContainer>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await api.get<AlbumsProps[]>("/albums");
    const albumsData = response.data.slice(0, 15); // Limita a 15 elementos para exemplo

    return {
      props: {
        albumsData,
      },
      revalidate: 60 * 5, // Revalida a cada 5 minutos (300 segundos)
    };
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return {
      props: {
        albumsData: [],
      },
    };
  }
};

export default Albums;
