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
import { AlbumsProps } from "@/types/albums";

interface AlbumsPageProps {
  albums: AlbumsProps[];
}

const Albums = ({ albums }: AlbumsPageProps) => {
  return (
    <>
      <Head>
        <title>Axios | Albums</title>
      </Head>
      <MainContentContainer>
        <Title>Álbums</Title>
        <GridContentContainer>
          {albums.map((album) => (
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
      </MainContentContainer>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await api.get<AlbumsProps[]>("/albums");
    const albums = response.data.slice(0, 30); // Limita a 15 elementos para exemplo

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
