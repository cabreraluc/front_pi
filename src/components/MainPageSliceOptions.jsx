import styles from "./ModulesCss/MainPage.module.css";
import { VscClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MainPageSliceOptions(props) {
  const state = useSelector((state) => state);
  return (
    <div
      className={styles.sliceOptions}
      style={
        props.showOptions
          ? {
              position: "absolute",
              "margin-left": "-0%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "rgb(0, 0, 0,0.9)",
              width: "100%",

              transition: "0.5s",
              zIndex: "3",
              paddingBottom: "3rem",
            }
          : {
              position: "absolute",
              "margin-left": "-200%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "rgb(0, 0, 0,0.9)",
              width: "100%",

              paddingBottom: "3rem",
              transition: "0.5",
              zIndex: "3",
            }
      }
    >
      <div className={styles.buttonCloseOptionsBox}>
        <button
          onClick={() => props.setShowOptions(!props.showOptions)}
          className={styles.buttonCloseOptions}
        >
          <VscClose />
        </button>
      </div>

      <div className={styles.filter_box}>
        <form>
          <label className={styles.filter_text}>Api/Db</label>
          <select
            className={styles.filters}
            name=""
            id=""
            onChange={(event) => props.restSelector(event.target.value)}
            defaultValue="base"
          >
            <option disabled={true} value="base">
              -------
            </option>
            <option value="api">API</option>
            <option value="db">DB</option>
          </select>
        </form>

        <form>
          <label className={styles.filter_text}>By attack</label>
          <select
            className={styles.filters}
            onChange={(event) => props.restSelector(event.target.value)}
            defaultValue="base"
          >
            <option disabled={true} value="base">
              -------
            </option>
            <option value="fuerte">Strongest</option>
            <option value="debil">Weaknest</option>
          </select>
        </form>

        <form>
          <label className={styles.filter_text}>Alphabetic</label>
          <select
            className={styles.filters}
            name=""
            id=""
            onChange={(event) => props.restSelector(event.target.value)}
            defaultValue="base"
          >
            <option disabled={true} value="base">
              -------
            </option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </form>

        <form>
          <label className={styles.filter_text}>Type</label>
          <select
            className={styles.filters}
            name="tipos"
            onChange={(event) => {
              props.tiposSelector(event.target.value);
            }}
            defaultValue="base"
          >
            <option disabled={true} value="base">
              -------
            </option>
            {state.tipos.map((element) => {
              return <option value={element.name}>{element.name}</option>;
            })}
          </select>
        </form>
        <div className={styles.buttonsOptionsBox}>
          <Link to="/CreatePokemon">
            <button className={styles.buttonsHeader}>Create Pokemon!</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
