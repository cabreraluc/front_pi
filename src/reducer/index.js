
import {GET_POKEMONS,GET_POKEMONS_BY_NAME,GET_POKEMONS_BY_ID, GET_TYPES, POST_POKEMON,GET_TRASH,
    ORDER_BY_ATTACK_ASC,RESTORE_POKEMONS,ORDER_BY_ATTACK_DSC,ORDER_DSC,ORDER_ASC,FILTER_BY_TYPE,FILTER_API,FILTER_BD,SET_PAGE, FILTER_BY_TYPE_, DELETE_POKEMONS, DELETE_FROM_TRASH, RESTORE_FROM_TRASH} from "../actions/action-types"

const initialState = {
    allPokemons : [],
    pokemonFiltered:[],
    onePokemon:{},
    trashPokemons:[],
    tipos:[],

    

    

}


export default function Reducer(state = initialState, {type, payload}){
switch (type) {
    case GET_POKEMONS:{
        return{
            ...state,
            allPokemons: payload,
            pokemonFiltered:payload

        }
    }
    case RESTORE_POKEMONS:{
        return{
            ...state,
            allPokemons: payload,
            pokemonFiltered:payload,
            

        }
    }
    case GET_POKEMONS_BY_NAME:{
            if (!payload.message){
                state.pokemonFiltered = []
                state.pokemonFiltered.push(payload)}
        
    }
    case GET_POKEMONS_BY_ID:{

        if(payload === null){
            return{
                ...state,
                onePokemon : {message:"Pokemon no encotrado"}
            }
        }else{
             return{
                ...state,
             onePokemon : payload
        }}
    }
    case GET_TYPES:{
        return{
            ...state,
            tipos:payload
            
        }
    }
       case FILTER_BD:{

            return{
                ...state,
                pokemonFiltered : state.allPokemons.filter(pokemon=>pokemon.pokeNumber===null)
                
            }
        
            
     }

     case FILTER_API:{

               return{
                ...state,
                pokemonFiltered:state.pokemonFiltered.filter(pokemon=>pokemon.pokeNumber)
            }
    }
     case POST_POKEMON:{
          fetch("https://backendpi-96qn.onrender.com/pokemons/",{
              method: "POST",
              headers:{"Accept": "application/json",
             "Content-Type":"application/json"},
                            
           body:JSON.stringify(payload)
              }
          )
     }
     case ORDER_BY_ATTACK_ASC:{
        return{
            ...state,
            pokemonFiltered:state.pokemonFiltered.sort(function(a,b){return b.attack - a.attack})
        }
     }
     case ORDER_BY_ATTACK_DSC:{
        return{
            ...state,
            pokemonFiltered:state.pokemonFiltered.sort(function(a,b){return a.attack - b.attack})
        }
     }
     case ORDER_ASC:{
        return{
            ...state,
            pokemonFiltered:state.pokemonFiltered.sort(function(a,b){return a.name.localeCompare(b.name)})
        }
     }
     case ORDER_DSC:{
        return{
            ...state,
            pokemonFiltered:state.pokemonFiltered.sort(function(a,b){return b.name.localeCompare(a.name)})
        }
     }
   
     case FILTER_BY_TYPE:{
        return{
            ...state,
            pokemonFiltered:state.pokemonFiltered.filter(element => element.type.includes(payload) )
        }
     }
    case GET_TRASH:{
        return{
            ...state,
            trashPokemons:payload
        }
    }
  
    

    default:
        return state;
}
}