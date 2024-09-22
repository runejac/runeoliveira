import Link from "next/link";

export default function FourOhFour() {
  return (
    <section
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Oisann, her skjer det ikke stort.</h1>
      <ul>
        <li style={{ fontSize: "2em" }}>
          Gå tilbake til <Link href="/">forsiden</Link>
        </li>
      </ul>
    </section>
  );
}
