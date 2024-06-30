// Imports
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";

// Utils
import api from "@/api/axios";
import { PostsProps, CommentsProps } from "@/types/apiProps";

// Components
import MainContentContainer from "@/components/MainContentContainer";

// Styles
import styles from "./Post.module.css";
import GridContentContainer from "@/components/GridContentContainer";

interface PostPageProps {
  post: PostsProps;
  comments: CommentsProps[];
}

export default function PostDetail({ post, comments }: PostPageProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Detalhes</title>
        <meta name="description" content={`Detalhes do post ${post.title}`} />
      </Head>
      <MainContentContainer>
        <div className={styles.detail_post}>
          <h1>{post.title}</h1>
          <p className={styles.text}>{post.body}</p>
        </div>

        <GridContentContainer>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.card_comment}>
              <div className={styles.comment_infos}>
                <span>
                  <strong>Nome:</strong> {comment.name}
                </span>
                <span>
                  <strong>E-mail:</strong> {comment.email}
                </span>
              </div>
              <p>{comment.body}</p>
            </div>
          ))}
        </GridContentContainer>
      </MainContentContainer>
    </>
  );
}

// getStaticPaths
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await api.get<PostsProps[]>("/posts");
    const posts = response.data;

    const paths = posts.map((post) => ({
      params: { postId: post.id.toString() },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Erro ao buscar posts para paths:", error);
    return { paths: [], fallback: false };
  }
};

// getStaticProps
export const getStaticProps: GetStaticProps = async (context) => {
  const { postId } = context.params!;

  try {
    const postResponse = await api.get(`/posts/${postId}`);
    const commentsResponse = await api.get("/comments", {
      params: { postId },
    });

    return {
      props: {
        post: postResponse.data,
        comments: commentsResponse.data,
      },
      revalidate: 30,
    };
  } catch (error) {
    console.error("Erro ao buscar post", error);

    return {
      props: {
        post: null,
        comments: [],
      },
      notFound: true,
    };
  }
};
