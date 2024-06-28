import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "@/api/axios";
import { PostsProps } from "@/types/posts";
import Head from "next/head";
import styles from "./Post.module.css";
import MainContentContainer from "@/components/MainContentContainer";

export default function PostDetail() {
  // 1. Inicializa o roteador do Next.js para acessar parâmetros da URL
  const router = useRouter();
  // 2. Extrai o parâmetro 'id' da URL
  const { postId } = router.query;
  // 3. Cria um estado para armazenar os detalhes do post
  const [post, setPost] = useState<PostsProps | null>(null);

  // 4. Usa useEffect para chamar getPost quando o componente monta e quando o id muda
  useEffect(() => {
    // 5. Define a função que busca os detalhes do post
    const getPost = async () => {
      try {
        const response = await api.get<PostsProps>(`/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error("Erro ao carregar o post", error);
      }
    };

    if (postId) {
      getPost();
    }
  }, [postId]);

  // 6. Renderiza um texto de carregamento enquanto os dados não são carregados
  if (!post) {
    return <p>Carregando...</p>;
  }

  // 7. Renderiza os detalhes do post
  return (
    <>
      <Head>
        <title>{post.title} | Detalhes</title>
        <meta name="description" content={`Detalhes do post ${post.title}`} />
      </Head>
      <MainContentContainer>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </MainContentContainer>
    </>
  );
}
