/** @format */

import IntroText from "@/components/introText/IntroText";
import AboutText from "@/components/aboutText/AboutText";
import { useContext } from "react";
import ProjectsText from "@/components/projects/ProjectsText";
import Navbar from "@/components/navbar/Navbar";
import styles from "./MainPage.module.scss";
import Modal from "@/components/projects/cards/modal/Modal";
import Footer from "@/components/footer/Footer";
import Background from "@/components/background/Background";
import { WindowWidthContext } from "@/context/WindowWidthContext";
import { useScrollVisibility } from "@/hooks/useScrollVisibility";

export default function MainPage() {
  const windowWidth = useContext(WindowWidthContext);
  const visible = useScrollVisibility();

  const handleHeader = () => {
    return windowWidth! >= 800 && !visible ? "relative" : "sticky";
  };

  return (
    <>
      <Background />
      <Modal />
      <header
        id={"header-tag"}
        style={{
          position: handleHeader(),
        }}
        className={styles.headerTag}
      >
        <Navbar />
      </header>
      <main className={styles.mainTag}>
        <IntroText />
        <section className={styles.projectsAndAboutSection}>
          <div className={styles.divContainer}>
            <AboutText />
            <ProjectsText />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
