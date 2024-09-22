import React, { useRef } from "react";
import styles from "./ProjectsText.module.scss";
import Cards from "@/components/projects/cards/Cards";

const ProjectsText = () => {
  const projectsRef = useRef<null | HTMLElement>(null);

  const latelyTechnologiesWorkedWith = [
    {
      name: "Next.js",
      link: "https://nextjs.org/",
    },
    {
      name: "Tailwind CSS",
      link: "https://tailwindcss.com/",
    },
    {
      name: "TypeScript",
      link: "https://www.typescriptlang.org/",
    },
    {
      name: "Jetpack Compose",
      link: "https://developer.android.com/jetpack/compose",
    },
    {
      name: "Kotlin",
      link: "https://kotlinlang.org/",
    },
  ];

  return (
    <section
      ref={projectsRef}
      id={"projects"}
      className={styles.projectsTextContainer}
    >
      <h2 className={styles.header2}>projects</h2>
      <Cards />
      <div className={styles.skillsListContainer}>
        <p>Technologies I have been working with lately:</p>
        <div className={styles.skillsList}>
          {latelyTechnologiesWorkedWith &&
            latelyTechnologiesWorkedWith.map((skill, index) => (
              <a
                key={index}
                href={skill.link}
                target={"_blank"}
                rel="noreferrer"
              >
                {skill.name}
              </a>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsText;
