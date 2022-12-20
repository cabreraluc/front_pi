import loadingGif from "../Assets/Loading.gif";
import styles from "../components/ModulesCss/MainPage.module.css"

export default function Loader() {
  return (
    <div>
      <img src={loadingGif} alt="Loading" className={styles.Loader}/>
    </div>
  );
}
