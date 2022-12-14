import { Link } from "react-router-dom"
import styles from "./ModulesCss/LandingPage.module.css"
import img from "../Assets/pikachu.png"
import imagen2 from "../Assets/imagen2.png"
import imagen3 from "../Assets/imagen3.png"


export default function LandingPage(){


    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <button><a href="https://www.linkedin.com/in/lucas-cabrera-0b596224b/" target="_blank" style={{color:"rgb(109, 58, 217)"}}>Linkedin</a></button>
                <button><a href="https://github.com/cabreraluc" target="_blank" style={{color:"rgb(109, 58, 217)"}} >Github</a></button>
            </div>
            <div className={styles.container_sub}>
             <div className={styles.body}>
              <h1>Welcome to the pokedex 2.0</h1>
              <Link to = "/MainPage">
              <button className={styles.button}>
              Let´s see the Pokemons
              </button>
              </Link>
             </div>
            <div className={styles.img}>
             <div className={styles.carrusel}>
              <div>
                <ul>
                 {[img, imagen2, imagen3].map(element => {
                  return (
                   <li><img src={element}></img></li>
                            )
                           }
                          )
                         }
                </ul>
               </div>
             </div>
            </div>
            </div>
        </div>
    )
}