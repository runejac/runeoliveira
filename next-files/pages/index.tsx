import CustomHead from "@/components/layouts/head/CustomHead";
import React from "react";
import MainPage from "@/components/MainPage";
import OpenModalProvider from "@/context/OpenModalContext";
import DataProvider, { type DataContextProps } from "@/context/DataContext";
import WindowWidthProvider from "@/context/WindowWidthContext";

export default function Home(props: Readonly<DataContextProps>) {
  return (
    <>
      <CustomHead
        title="Rune Oliveira, developer"
        content="Rune Oliveira is a Front-End Engineer based in Oslo, Norway, focusing on user-centric development. Explore his personal website of projects and personal adventures."
      />
      <WindowWidthProvider>
        <DataProvider data={props}>
          <OpenModalProvider>
            <MainPage />
          </OpenModalProvider>
        </DataProvider>
      </WindowWidthProvider>
    </>
  );
}

import introText from "../data/introText.json";
import projectsText from "../data/projectsText.json";
import projectsData from "../data/projectsData.json";
import aboutText from "../data/aboutText.json";

export async function getStaticProps() {
  return {
    props: { introText, projectsText, projectsData, aboutText },
  };
}
