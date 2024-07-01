import MainContentContainer from "@/components/MainContentContainer";
import Title from "@/components/TitlePage";
import { useAuth } from "@/context/AuthContext";
import Head from "next/head";
import React from "react";

const Home = () => {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Axios | Home</title>
      </Head>
      <MainContentContainer>
        <Title>Home</Title>
        {user && <h1>Bem-vindo, {user.name}</h1>}
      </MainContentContainer>
    </>
  );
};

export default Home;
