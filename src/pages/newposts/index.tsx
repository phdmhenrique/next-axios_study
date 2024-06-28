import Head from "next/head";
import styles from "./NewPost.module.css";
import api from "@/api/axios";
import { useRouter } from "next/router";
import { useState } from "react";

const NewPost = () => {
  const router = useRouter();

  const [title, setTitle] = useState<string>();
  const [body, setBody] = useState<string>();

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();    

    const post = { title, body, userId: 1};

    await api.post('/posts', {
      body: post,
    });

    router.push('/');    
  };

  return (
    <>
      <Head>
        <title>Axios | Novos Posts</title>
      </Head>

      <div className={styles.new_post}>
        <h1 className="title">Inserir Nova Postagem</h1>
        <form onSubmit={createPost} className={styles.form}>
          <div className={styles.form_control}>
            <label htmlFor="title">Título:</label>
            <input onChange={(e) => setTitle(e.target.value) } 
            type="text" name="title" placeholder="Digite o título" />
          </div>
          <div className={styles.form_control}>
            <label htmlFor="body">Conteúdo:</label>
            <textarea
              onChange={(e) => setBody(e.target.value)}
              name="body"
              placeholder="Digite o conteúdo da postagem"
            ></textarea>
          </div>

          <input type="submit" value="Criar Post" className="btn" />
        </form>
      </div>
    </>
  );
};

export default NewPost;
