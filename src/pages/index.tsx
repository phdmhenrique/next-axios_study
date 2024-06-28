import MainContentContainer from "@/components/MainContentContainer";
import Title from "@/components/TitlePage";
import Head from "next/head";
import React from "react";

const Home = () => {
  return (
    <>
      <Head>
        <title>Axios | Home</title>
      </Head>
      <MainContentContainer>
        <Title>Home</Title>
      </MainContentContainer>
    </>
  );
};

export default Home;
