import React, { useContext, useEffect, useState } from "react";
import styles from "./CardItem.module.scss";
import { DataContext } from "@/context/DataContext";
import Image from "next/image";
import { WindowWidthContext } from "@/context/WindowWidthContext";
import { OpenModalContext } from "@/context/OpenModalContext";

export let indexClicked: number;

const CardItem = () => {
  const { projectsData } = useContext(DataContext);
  const { openModal } = useContext(OpenModalContext);
  const windowWidth = useContext(WindowWidthContext);
  const [isOnSmallDevice, setIsOnSmallDevice] = useState(false);
  const [hoveredCards, setHoveredCards] = useState(
    Array(projectsData.length).fill(false),
  );

  useEffect(() => {
    if (windowWidth! > 800) setIsOnSmallDevice(false);
    else if (windowWidth! <= 799) setIsOnSmallDevice(true);
  }, [windowWidth]);

  const toggleHover = (index: number) => {
    const updatedHoveredCards = [...hoveredCards];
    updatedHoveredCards[index] = !updatedHoveredCards[index];
    setHoveredCards(updatedHoveredCards);
  };

  const handleClick = (index: number) => {
    const headerTag = document.querySelector(
      "#header-tag",
    ) as HTMLElement | null;

    if (headerTag) {
      headerTag.style.position = "relative";
    }
    indexClicked = index;
  };

  return (
    <>
      {projectsData.map((cardItem, index) => {
        return (
          <article
            onMouseEnter={() => toggleHover(index)}
            onFocus={() => toggleHover(index)}
            onBlur={() => setHoveredCards([])}
            onMouseLeave={() => setHoveredCards([])}
            onMouseUp={() => {
              openModal();
              handleClick(index);
              window.umami.track(`${cardItem.appTitle} opened`);
            }}
            onKeyDown={(event) => {
              event.key === "Enter" && openModal();
              handleClick(index);
              window.umami.track(`${cardItem.appTitle} opened`);
            }}
            title={`Click to open ${cardItem.appTitle} project window`}
            aria-label={`Click to open ${cardItem.appTitle} project window`}
            tabIndex={0}
            role={"button"}
            key={index}
            className={styles.card}
          >
            <div className={styles.imageWrapper}>
              {!isOnSmallDevice && (
                <Image
                  className={`${styles.modalImg} ${
                    hoveredCards[index] ? "" : styles.hideImgOnMount
                  }`}
                  src={cardItem.img}
                  alt={`Image of ${cardItem.appTitle} app showing when hovering over card`}
                  width={1000}
                  height={1000}
                />
              )}
              {isOnSmallDevice && (
                <Image
                  className={styles.modalImg}
                  src={cardItem.img}
                  alt={`Image of ${cardItem.appTitle} app showing when hovering over card`}
                  width={1000}
                  height={1000}
                />
              )}
            </div>
            <div className={styles.circularBorder}>
              <h2 className={styles.appTitleH2}>{cardItem.appTitle}</h2>
            </div>
            <div className={styles.technologiesContainer}>
              <ul>
                {cardItem.techSpecs.map((spec, index) => {
                  return <li key={index}>{spec}</li>;
                })}
              </ul>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default CardItem;
