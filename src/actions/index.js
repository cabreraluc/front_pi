
import {GET_POKEMONS, FILTER_BY_TYPE_, RESTORE_POKEMONS,DELETE_POKEMONS, GET_POKEMONS_BY_NAME,GET_POKEMONS_BY_ID, GET_TYPES, POST_POKEMON,
  ORDER_BY_ATTACK_ASC,ORDER_BY_ATTACK_DSC, GET_TRASH, ORDER_DSC,ORDER_ASC,FILTER_BY_TYPE,FILTER_API,FILTER_BD,SET_PAGE, FUEGO_VOLADOR, DELETE_FROM_TRASH, RESTORE_FROM_TRASH} from "./action-types.js"


export function getPokemons(){

       return async function(dispatch){
      const a = await fetch("http://localhost:3001/pokemons/")
      const b = await a.json()
    
        dispatch({
         type:GET_POKEMONS,payload:b.sort(function(a,b){return a.pokeNumber - b.pokeNumber})
      })}
    
}

export function restorePokemons(){

  return async function(dispatch){
 const a = await fetch("http://localhost:3001/pokemons/restorePokemons")
 const b = await a.json()

   dispatch({
    type:RESTORE_POKEMONS ,payload:b.sort(function(a,b){return a.pokeNumber - b.pokeNumber})
 })}

}



export function getTrash(){

  return async function(dispatch){
  const a = await fetch("http://localhost:3001/deleted")

  const b = await a.json()
  if(b.message){dispatch({type:GET_TRASH,payload:b})}
  else{ dispatch({
    type:GET_TRASH,payload:b.sort(function(a,b){return a.pokeNumber - b.pokeNumber})
 })}
  }

}




export const getPokemonsByName = (name)=>{


            return function(dispatch) {
                return fetch(`http://localhost:3001/pokemons?name=${name}`)
                  .then(response => response.json())
                  .then(json => {
                    dispatch({ type: GET_POKEMONS_BY_NAME, payload: json });
                  });
              };
            
}

export const getPokemonsById = (id)=>{
    
        return function(dispatch) {
            return fetch(`http://localhost:3001/pokemons/${id}`)
              .then(response => response.json())
              .then(json => {
                dispatch({ type: GET_POKEMONS_BY_ID, payload: json });
              });
          };
}


export const getTypes= ()=>{

        return function(dispatch) {
            return fetch(`http://localhost:3001/types`)
              .then(response => response.json())
              .then(json => {
                dispatch({ type: GET_TYPES, payload: json });
              });
          };
}


export const postPokemon=  (payload)=>{
  
  return{
    type: POST_POKEMON, payload
  }
}

export const filterBd= ()=>{
  return{
    type: FILTER_BD
  }
}

export const filterApi= ()=>{
  return{
    type: FILTER_API
  }
}

export const filterByType= (payload)=>{
  return{
    type: FILTER_BY_TYPE, payload
  }
}

export const filterByType_ = (payload)=>{
  return{
    type:FILTER_BY_TYPE_,payload
  }
}

export const orderAsc= ()=>{
  return{
    type: ORDER_ASC
  }
}

export const orderDsc= ()=>{
  return{
    type: ORDER_DSC
  }
}

export const orderByAttackAsc= ()=>{
  return{
    type: ORDER_BY_ATTACK_ASC
  }
}

export const orderByAttackdsc= ()=>{
  return{
    type: ORDER_BY_ATTACK_DSC
  }

}

export const setPage = (data) =>{
  return{
    type: SET_PAGE, payload:data
  }
}

export const fuegoVolador = () =>{
  return{
    type: FUEGO_VOLADOR
  }
}

