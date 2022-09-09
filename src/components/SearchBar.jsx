import {getPokemonsByName} from "../actions/index"
import { useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import styles from "./ModulesCss/SearchBar.module.css"
import {HiSearchCircle} from "react-icons/hi"


const state = {
    pokemon : ""
}

export default function SearchBar(props){

    const dispatch = useDispatch()

 


    function subirAlState(event){
        state.pokemon = event.target.value.toLowerCase()
        console.log(state.pokemon)
    }

    function cons(event){
        event.preventDefault()
        if(state.pokemon.length>0){
        props.handleReset()
        dispatch(getPokemonsByName(state.pokemon)) 
        document.getElementById("inputDeBusqueda").value=""
      }
    }

    return(
       
          <div className={styles.searchBar}>
           <form onSubmit={(event)=>{cons(event)}}>
            
            
             <input   autoComplete="off" id="inputDeBusqueda" onChange={(event) => {subirAlState(event)}} className={styles.input}/>
             <button className={styles.buttons} type="submit">Search</button>

          </form>
          </div>    
         
       
    )
}






