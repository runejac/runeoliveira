import styles from "./AboutText.module.scss";
import { useContext, useRef } from "react";
import { DataContext } from "@/context/DataContext";
import Link from "next/link";

const AboutText = () => {
  const { aboutText } = useContext(DataContext);
  const aboutSectionRef = useRef<null | HTMLElement>(null);

  return (
    <section
      id={"about"}
      ref={aboutSectionRef}
      className={styles.aboutAndImgContainer}
    >
      <div className={styles.aboutMeContainer}>
        <h2>about</h2>
        <p>{aboutText.p1}</p>
        <p>
          {aboutText.p2}
          <Link
            href={
              "https://www.kristiania.no/studier/bachelor/informasjonsteknologi-frontend-og-mobilutvikling/"
            }
            target={"_blank"}
            aria-label={"open course link"}
            onClick={() => {
              window.umami.track("bachelor course link opened");
            }}
          >
            <span>frontend and mobile development</span>
          </Link>
          {aboutText.p2a}
        </p>
        <p>{aboutText.p3}</p>
      </div>
    </section>
  );
};

export default AboutText;
