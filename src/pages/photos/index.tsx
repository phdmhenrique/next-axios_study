import api from "@/api/axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { PhotosProps } from "@/types/photos";
import MainContentContainer from "@/components/MainContentContainer";
import TitlePage from "@/components/TitlePage";

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
        {photos.length === 0 ? (
          <p>Carregando...</p>
        ) : (
          <div className={styles.container_card}>
            {photos.map((photo) => (
              <div className={styles.card} key={photo.id}>
                <h2>{photo.title}</h2>
                <Image
                  width={150}
                  height={150}
                  src={photo.thumbnailUrl}
                  alt={`Imagem de ${photo.title}`}
                />
                <Link href={`/photos/${photo.id}`} className={styles.details}>
                  Ver Detalhes
                </Link>
              </div>
            ))}
          </div>
        )}

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
