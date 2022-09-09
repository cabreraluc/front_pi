import react from "react"
import MainPage from "./MainPage"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getPokemons } from "../actions"
import styles from "./ModulesCss/LandingPage.module.css"
import img from "./ModulesCss/pikachu.png"


export default function LandingPage(){


    return(
        <div className={styles.container}>
            <div className={styles.img}>
             <img src={img} alt="" />
            </div>
            <div className={styles.body}>
              <h1>Welcome to the pokedex</h1>
              <h3>By cabreraluc</h3>
             <Link to = "/MainPage">
             <button className={styles.button}>
             Let´s see the Pokemons
             </button>
             </Link>
            </div>
        </div>
    )
}