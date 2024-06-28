import api from "@/api/axios";
import MainContentContainer from "@/components/MainContentContainer";
import TitlePage from "@/components/TitlePage";
import { AlbumsProps } from "@/types/albums";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Album = () => {
  const router = useRouter();
  const { albumId } = router.query;
  const [album, setAlbum] = useState<AlbumsProps | null>(null);

  const getAlbum = async () => {
    try {
      const response = await api.get(`/albums/${albumId}`);
      setAlbum(response.data);
    } catch (error) {
      console.error("Não foi possível carregar o album", error);
    }
  };

  useEffect(() => {
    if (albumId) {
      getAlbum();
    }
  }, [albumId]);

  if (!album) {
    return <p>Carregando Album...</p>;
  }

  return (
    <>
      <Head>
        <title>Axios | Album</title>
      </Head>
      <MainContentContainer>
        <TitlePage>{album.title}</TitlePage>
      </MainContentContainer>
    </>
  );
};

export default Album;
