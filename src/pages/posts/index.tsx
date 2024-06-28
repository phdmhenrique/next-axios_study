import Head from "next/head";
import styles from "../../styles/Home.module.css";
import api from "@/api/axios";
import { useEffect, useState } from "react";
import { PostsProps } from "@/types/posts";
import Link from "next/link";

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
      <main className={styles.home}>
        <h1 className="title">Últimos Posts</h1>
        <div className={styles.container_card}>
          {posts.length === 0 ? (
            <p>Carregando...</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className={styles.card}>
                <div>
                  <h2>{post.title}</h2>
                  <p>{post.body}</p>
                </div>
                <Link href={`/posts/${post.id}`} className={styles.details}>
                  Ver Detalhes
                </Link>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}
