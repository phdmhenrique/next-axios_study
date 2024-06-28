import api from "@/api/axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { PhotosProps } from '@/types/photos';


const Photos = () => {
  const [photos, setPhotos] = useState<PhotosProps[]>([]);

  const getPhotos = async () => {
    try {
      const response = await api.get<PhotosProps[]>("/photos?_limit=30");
      setPhotos(response.data);
    } catch (error) {
      console.error("Erro ao carregar as fotos", error);
    }
  };

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <>
      <Head>
        <title>Axios | Fotos</title>
        <meta name="description" content="Listagem de Fotos" />
      </Head>

      <main>
        <div className={styles.home}>
          <h1 className="title">Fotos</h1>
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
                  <Link href={`/photos/${photo.id}`} className={styles.details}>Ver Detalhes</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Photos;
