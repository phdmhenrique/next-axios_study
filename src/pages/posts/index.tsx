import Head from "next/head";
import styles from "./Posts.module.css";
import api from "@/api/axios";
import { useEffect, useState } from "react";
import { PostsProps } from "@/types/posts";
import Link from "next/link";
import MainContentContainer from "@/components/MainContentContainer";
import TitlePage from "@/components/TitlePage";
import GridContentContainer from "@/components/GridContentContainer";
import Button from "@/components/Button";

export default function Posts() {
  const [posts, setPosts] = useState<PostsProps[]>([]);

  const getPosts = async () => {
    try {
      const response = await api.get<PostsProps[]>("/posts?_limit=24");

      const data = response.data;
      setPosts(data);
    } catch (error) {
      console.error("deu merda", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Axios | Postagens</title>
        <meta name="description" content="Projeto de treino com axios" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MainContentContainer>
        <TitlePage>Posts</TitlePage>
        <GridContentContainer>
          {posts.length === 0 ? (
            <p>Carregando...</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className={styles.post_container}>
                <div className={styles.post_title}>
                  <h2>{post.title}</h2>
                  <p>{post.body}</p>
                </div>
                <Link href={`/posts/${post.id}`} className={styles.post_link}>
                  <Button>Ver Detalhes</Button>
                </Link>
              </div>
            ))
          )}
        </GridContentContainer>
      </MainContentContainer>
    </>
  );
}
