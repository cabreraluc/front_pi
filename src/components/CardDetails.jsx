import { useDispatch, useSelector } from "react-redux";
import { getPokemonsById } from "../actions/index";
import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import styles from "./ModulesCss/CardsDetails.module.css";

export default function CardDetails(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  React.useEffect(() => {
    dispatch(getPokemonsById(props.match.params.id));
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.header}>
          <Link to="/MainPage">
            <button
              className={styles.button}
              onClick={() => (state.onePokemon = {})}
            >
              Return to main page
            </button>
          </Link>
        </div>
        {state.onePokemon.id === props.match.params.id ? (
          <div className={styles.body}>
            <div className={styles.img_name}>
              <img
                src={state.onePokemon.img}
                alt="Pokemon"
                className={styles.img}
              />
            </div>
            <div className={styles.stats}>
              <span className={styles.name_pokemon}>
                {state.onePokemon.name[0].toUpperCase() +
                  state.onePokemon.name.slice(1)}
              </span>
              <span>health: {state.onePokemon.health}</span>
              <span>Types: {state.onePokemon.type}</span>
              <span>Attack: {state.onePokemon.attack}</span>
              <span>Defense: {state.onePokemon.defense}</span>
              <span>Speed: {state.onePokemon.speed}</span>
              <span>Peso: {state.onePokemon.weight}lbs</span>
              <span>Height: {state.onePokemon.height}</span>
              <span>pokeNumber: {state.onePokemon.id}</span>
            </div>
          </div>
        ) : state.onePokemon.message ? (
          <div className={styles.body}>
            <Message color={"black"}></Message>
          </div>
        ) : !state.onePokemon.name ? (
          <div className={styles.body}>
            <Loader></Loader>
          </div>
        ) : (
          false
        )}

        <div className={styles.footer}>
          <span> Save your Pokenumber to search pokemons in /Pokemons/</span>
        </div>
      </div>
    </div>
  );
}
