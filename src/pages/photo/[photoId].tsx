// Import
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Styles
import styles from "../photos/Photos.module.css";

// Utils
import api from "@/api/axios";
import { PhotosProps } from "@/types/apiProps";

// Components
import MainContentContainer from "@/components/MainContentContainer";
import TitlePage from "@/components/TitlePage";
import { GetStaticPaths, GetStaticProps } from "next";

interface PhotosPageProps {
  photo: PhotosProps;
}

const PhotoDetail = ({ photo }: PhotosPageProps) => {
  return (
    <>
      <Head>
        <title>Axios | {photo.title}</title>
      </Head>
      <MainContentContainer>
        <TitlePage>{photo.title}</TitlePage>
        <Image
          width={600}
          height={600}
          src={photo.url}
          alt={photo.title}
          className={styles.photo_img}
        />
      </MainContentContainer>
    </>
  );
};

// getStaticPaths
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await api.get<PhotosProps[]>("/photos");
    const photos = response.data;

    const paths = photos.map((photo) => ({
      params: { photoId: photo.id.toString() },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Erro ao buscar as photos para paths", error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

// getStaticProps
export const getStaticProps: GetStaticProps = async (context) => {
  const { photoId } = context.params!;

  try {
    const response = await api.get<PhotosProps>(`/photos/${photoId}`);
    const photo = response.data;

    return {
      props: {
        photo,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar photo", error);

    return {
      notFound: true,
    };
  }
};

export default PhotoDetail;
