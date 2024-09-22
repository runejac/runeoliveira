---
import styles from "./IntroText.module.scss";
import { getEntry } from 'astro:content';

const { data } = await getEntry('introText', 'index');
const { h1 } = data;
---

<section class="intro-text-container">
  <div class="intro-text-box">
    <div>
      <h1>{h1}</h1>
    </div>
    <div class="special">
      <h2>front-end engineer</h2>
    </div>
    <div>
      <h3>
        - based in Oslo, coding for the media industry
        <br />
        {/*Fly fishing and brazilian jiu-jitsu is my jam.*/}
      </h3>
    </div>
  </div>
</section>
<style>
  .intro-text-container {
    display: flex;
    background: none;
    height: 100svh;
    flex-direction: row;
    margin-bottom: 2.5rem;
    padding-bottom: 3rem;
  }

  .awesome-content {
    z-index: 1;
    display: none;
  }

  .intro-text-box {
    display: flex;
    flex-direction: column;
    background: none;
    justify-content: space-between;
    padding-left: 0.5rem;
  }

  .intro-text-box div {
    background: none;
    color: #ffffff;
    width: fit-content;
  }

  .intro-text-box h1 {
    font-family: "Messapia Bold", serif;
    font-size: 3.17rem;
    letter-spacing: -0.07em;
    color: rgba(255, 255, 255, 0.77);
    text-transform: uppercase;
    background: none;
  }

  .intro-text-box h2 {
    font-family: "Satoshi Light", serif;
    font-size: 3rem;
    letter-spacing: 0.04em;
    -webkit-background-clip: text !important;
    background: linear-gradient(
      130deg,
      var(--main-orange),
      var(--main-red) 41.07%,
      var(--main-cyan) 76.05%
    );
    color: transparent;
    position: relative;
    display: inline-block;
  }

  .intro-text-box h3 {
    font-family: "Satoshi Light", serif;
    background: none;
    font-size: 2.3rem;
  }

  @media (min-width: 40em) {
    .intro-text-box {
      justify-content: space-around;
    }

    .intro-text-box h1 {
      font-size: 6rem;
    }

    .intro-text-box h2 {
      font-size: 3.5rem;
    }

    .intro-text-box h3 {
      font-size: 2.6rem;
    }
  }

  @media (min-width: 70em) {
    .intro-text-box h1 {
      font-size: 7.6rem;
    }

    .intro-text-box h2 {
      font-size: 4.5rem;
    }

    .intro-text-box h3 {
      font-size: 3.5rem;
    }
  }
</style>