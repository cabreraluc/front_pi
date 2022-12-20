import React from "react";
import Loader from "./Loader";
import styles from "./ModulesCss/Cards.module.css";
import { Link } from "react-router-dom";
import { VscClose } from "react-icons/vsc";
import { VscDebugRestart } from "react-icons/vsc";

export default function Cards({
  sendToTrashFilter,
  data,
  handlerSendToTrash,
  lista,
}) {
  return (
    <div>
      <div className={styles.card}>
        <div className={styles.close_box}>
          {!lista.includes(data.name) ? (
            <button
              onClick={() => {
                {
                  handlerSendToTrash(data.name);
                }
              }}
              className={styles.close_button}
            >
              <VscClose />
            </button>
          ) : lista.includes(data.name) ? (
            <button
              onClick={() => {
                sendToTrashFilter(data.name);
              }}
              className={styles.restore_button}
            >
              <VscDebugRestart />
            </button>
          ) : (
            <div></div>
          )}
        </div>
        <Link to={`/Pokemons/${data.id}`}>
          <h3 className={styles.name}>{data.name}</h3>
          <img className={styles.img} src={data.img} alt="pokemon_img" />
          <div className={styles.types_container}>
            <h4 className={styles.types}>{data.type}</h4>
          </div>
        </Link>
      </div>
    </div>
  );
}
