// Imports
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";

// Utils
import api from "@/api/axios";
import { PostsProps } from "@/types/apiProps";

// Components
import MainContentContainer from "@/components/MainContentContainer";
import TitlePage from "@/components/TitlePage";
import GridContentContainer from "@/components/GridContentContainer";

// Styles
import styles from "./Posts.module.css";
import Button from "@/components/Button";
import ShowNumContents from "@/components/ShowNumContents";

interface PostsPageProps {
  posts: PostsProps[];
}

export default function Posts({ posts }: PostsPageProps) {
  const [visiblePosts, setVisiblePosts] = useState<PostsProps[]>([]);
  const [postsToShow, setPostsToShow] = useState<number>(30);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    setVisiblePosts(posts.slice(0, postsToShow));
  }, [posts, postsToShow]);

  const loadMorePosts = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setPostsToShow((prev) => prev + 30);
      setLoadingMore(false);
    }, 500);
  };

  return (
    <>
      <Head>
        <title>Axios | Postagens</title>
        <meta name="description" content="Projeto de treino com axios" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MainContentContainer>
        <TitlePage>Posts</TitlePage>
        <ShowNumContents
          visibleCount={visiblePosts.length}
          totalCount={posts.length}
          componentName="Posts"
        />
        <GridContentContainer>
          {visiblePosts.length === 0 ? (
            <p>Carregando...</p>
          ) : (
            visiblePosts.map((post) => (
              <Link
                href={`/post/${post.id}`}
                key={post.id}
                className={styles.post_container}
              >
                <div className={styles.post_title}>
                  <h2>{post.title}</h2>
                  <p>{post.body}</p>
                </div>
              </Link>
            ))
          )}
        </GridContentContainer>

        {postsToShow < posts.length && (
          <Button onClick={loadMorePosts} disabled={loadingMore}>
            {loadingMore ? "Carregando" : "Ver Mais"}
          </Button>
        )}
      </MainContentContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await api.get<PostsPageProps[]>("/posts");
    const posts = response.data;

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error("Não foi possível buscar os posts", error);

    return {
      props: {
        posts: [],
      },
    };
  }
};
