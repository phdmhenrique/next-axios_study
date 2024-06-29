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
import Button from "@/components/Button";

const Photos = () => {
  const [photos, setPhotos] = useState<PhotosProps[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getPhotos = async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await api.get<PhotosProps[]>(
        `/photos?_page=${pageNumber}&_limit=20`
      );
      setPhotos(response.data);
    } catch (error) {
      console.error("Erro ao carregar as fotos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPhotos(page);
  }, [page]);

  // função de próximo
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // função de anterior
  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

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
                <div key={photo.id} className={styles.photo}>
                  <h2 className={styles.photo_title}>{photo.title}</h2>
                  <Image
                    width={150}
                    height={150}
                    src={photo.thumbnailUrl}
                    alt={`Imagem de ${photo.title}`}
                    className={styles.photo_small_img}
                  />
                  <Link
                    href={`/photos/${photo.id}`}
                    className={styles.photo_link}
                  >
                    <Button>Ver Detalhes</Button>
                  </Link>
                </div>
              ))}
            </>
          )}
        </GridContentContainer>

        <div className={styles.pagination}>
          <button onClick={handlePreviousPage} disabled={page === 1}>
            Anterior
          </button>
          <button onClick={handleNextPage}>Próxima</button>
        </div>
      </MainContentContainer>
    </>
  );
};

export default Photos;
