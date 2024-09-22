import React from "react";
import styles from "./Cards.module.scss";
import CardItem from "@/components/projects/cards/CardItem";

const Cards = () => {
  return (
    <section className={styles.cardsContainer}>
      <CardItem />
    </section>
  );
};

export default Cards;
