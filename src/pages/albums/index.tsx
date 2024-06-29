// Imports
import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";

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

const Albums = () => {
  const [albums, setAlbums] = useState<AlbumsProps[]>([]);

  const getAlbums = async () => {
    try {
      const response = await api.get<AlbumsProps[]>(`/albums`);
      setAlbums(response.data);
    } catch (error) {
      console.error("Erro ao carregar os albums", error);
    }
  };

  useEffect(() => {
    getAlbums();
  }, [albums]);

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
              <Link href={`/albums/${album.id}`}>
                <Button>Ver Detalhes</Button>
              </Link>
            </div>
          ))}
        </GridContentContainer>
      </MainContentContainer>
    </>
  );
};

export default Albums;
