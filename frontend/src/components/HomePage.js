import styles from "../styles/HomePage.module.css";
import NavBar from "./NavBar";
import InfoComponents from "./InfoComponents";

function HomePage() {

  return (
    <div className={styles.pageWrapper}>
      <NavBar />
      <InfoComponents />
    </div>
  );
}

export default HomePage;
