import  React from "react"
import { useEffect } from "react"
import {filterBd, getPokemons, filterApi,orderByAttackAsc,orderByAttackdsc, orderAsc, orderDsc,setPage,getTypes,filterByType,filterByType_,restorePokemons} from "../actions"
import {deletePokemons} from "../middlewares/middlewares"
import { connect } from "react-redux"
import Cards from "./Cards"
import SearchBar from "./SearchBar"
import { useState } from "react"
import { Link } from "react-router-dom"
import Message from "./Message"
import Loader from "./Loader"
import styles from "./ModulesCss/MainPage.module.css"
import {FaRegTrashAlt} from "react-icons/fa"
import img from "../imagen-flecha.png"
import {VscDebugRestart} from "react-icons/vsc"
import Swal from 'sweetalert2'






let PokemonsPorPage =6 

function MainPage(props){

    let CountOf = Math.ceil(props.state.pokemonFiltered.length/PokemonsPorPage);
    let  arrCountOf = [];
    arrCountOf=props.state.pokemonFiltered.slice(0,CountOf)

    const [num1, setNum1] =  useState(0)
    const [num2, setNum2] =  useState(PokemonsPorPage)
    const [current, setCurrent] =  useState(1)
    const [tipos, setTipos] =  useState({info:[]})
    const [sendToTrash, setSendToTrash] = useState({lista:[]})
    
   

   
    React.useEffect(()=>{
    props.getPokemons()
    props.getTypes() 
    },[])




   const handlerNext = ()=>{
    if(current<CountOf){
    setNum1(num1 + PokemonsPorPage)
    setNum2(num2 + PokemonsPorPage)
    setCurrent(current + 1)}

    
   }

  const handlerPrev = ()=>{
    if(current>=2){
    setNum1(num1 - PokemonsPorPage)
    setNum2(num2 - PokemonsPorPage)
    setCurrent(current - 1)}
   }

   const handleReset = ()=>{
    setNum1(0)
    setNum2(PokemonsPorPage)
    setCurrent(1)
   }
   
   const handleRestorePokemons = ()=>{
    props.restorePokemons()
    props.state.onePokemon = {}
    setTimeout(() => {
      props.getPokemons()
    }, 800);
   

   }
   

   const tiposSelector = (tipo)=>{
      setTipos({...tipos,info:[...tipos.info,tipo]})
      props.filterByType(tipo)
   }

   const sendToTrashFilter=(name)=>{

      setSendToTrash({
        ...sendToTrash,lista:sendToTrash.lista.filter(element => element !== name)
          }
      )
          console.log(sendToTrash.lista)
        
      }
   

   const restSelector = (tipo)=>{
    if(tipo==="db"){props.filterBd()
    handleReset()}
    if(tipo==="api"){props.filterApi()}
    if(tipo==="fuerte"){props.orderByAttackAsc()}
    if(tipo==="debil"){props.orderByAttackDsc()}
    if(tipo==="a-z"){props.orderAsc()}
    if(tipo==="z-a"){props.orderDsc()}
   }

   const handlerDelete = () =>{
    Swal.fire({
      title: 'Are you want to send that pokemons to recycle bin?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        deletePokemons(sendToTrash.lista)
        setTimeout(() => {
          props.getPokemons()
        }, 800);
       
      }
    })

   }

   
 
   const handlerSendToTrash = (data)=>{
    if(!sendToTrash.lista.includes(data)){

    setSendToTrash({...sendToTrash,lista:[...sendToTrash.lista,data]})
   }
   

   }

    return  (

            <div id="container" className={styles.container}>
       
              
    {props.state.pokemonFiltered.length > 0 && props.state.tipos.length && !props.state.onePokemon.message ?  

<div className={styles.content}>
 <header>
                
                   
                <div className={styles.header}>
                
                    <button onClick={()=>{
                      props.getPokemons()
                      props.state.onePokemon = {}
                      }} className={styles.buttonsHeader}>Show all Pokemons!</button>
    <SearchBar handleReset={handleReset} ></SearchBar>
                      <button onClick={()=>{
                        if(props.state.allPokemons.length<40){handleRestorePokemons()}
                      }} className={styles.buttonsHeader}>Reload pokemons</button>

                     
                   <Link to="/CreatePokemon">
                  <button className={styles.buttonsHeader}>Create Pokemon!</button >
               </Link>
               
                  </div>      
              
 </header>

                  <div>
                
                    <div className={styles.filter_box}>
                   
                    <form>
                      <label>Api/Db</label>
                      <select className={styles.filters} name="" id="" onChange={(event)=>restSelector(event.target.value)} defaultValue="base">
                        <option disabled={true} value= "base">-------</option>
                        <option value="api">API</option>
                        <option value="db">DB</option>
                      </select>
                    </form>
                    
                    <form>
                      <label>By attack</label>
                      <select className={styles.filters} onChange={(event)=>restSelector(event.target.value)} defaultValue="base">
                        <option  disabled={true} value="base">-------</option>
                        <option value="fuerte">Strongest</option>
                        <option value="debil">Weaknest</option>
                      </select>
                    </form>
                    
                    <form>
                      <label>Alphabetic</label>
                      <select  className={styles.filters} name="" id=""  onChange={(event)=>restSelector(event.target.value)} defaultValue="base">
                        <option disabled={true} value="base">-------</option>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                      </select>
                    </form>
                 
                    <form>
                    <label>Type</label>
                      <select  className={styles.filters} name="tipos" onChange={(event)=>{tiposSelector(event.target.value)}} defaultValue="base">
                        <option  disabled={true} value="base">-------</option>
                        {props.state.tipos.map(element => {
                          return(<option value={element.name}>{element.name}</option>)
                        })}
                      </select>
                    </form>

                      
                       <Link to="/Trash">
                       <button className={styles.trash}>
                      <FaRegTrashAlt />
                      </button>
                       </Link>
                     

                        {/* <div>
                          {tipos.info.map(elemento => {
                            return (
                              <div>
                              <label>{elemento}</label>
                             <button onClick={()=>{
                              
                                tiposSelector(elemento)
                              }
                             }>x</button>
                             </div>
                            )
                          })}
                        </div> */}
         </div>
                <div className={styles.delete_box}>
                      {sendToTrash.lista.length?
                      ( <button onClick={()=>{
                      handlerDelete()
                      setSendToTrash({lista:[]})
                      }} className={styles.boton_delete}>send to trash</button>)
                      
                     :false}
                   
                    

                      </div>
             </div>
                   

                  <div className={styles.body}>
                
                   {current>=2?
                    <button onClick={handlerPrev} className={styles.buttonsNavegation}><p className={styles.textInButtonNavegation}>{`<`}</p></button>
                   :
                   <button onClick={handlerPrev} className={styles.buttonsNavegation}><p className={styles.textInButtonNavegation_disabled}>{`<`}</p></button>
                   }
                   
                  
                   
                  
              
                    <div className ={styles.cards}>
                    {props.state.pokemonFiltered.slice(num1,num2).map(element=>(
                    
                    <div id="card" ><Cards sendToTrashFilter={sendToTrashFilter} lista={sendToTrash.lista} handlerSendToTrash={handlerSendToTrash} data={element} key={element.id} /></div>
                   
                    )
                    )}
                    </div>
                    {current<CountOf?
                    <button  onClick={handlerNext} className={styles.buttonsNavegation}> <p className={styles.textInButtonNavegation}>{`>`}</p></button>
                    :
                    <button  onClick={handlerNext} className={styles.buttonsNavegation}> <p className={styles.textInButtonNavegation_disabled}>{`>`}</p></button>
                    }
                   
                    
                  </div>

                  
                  <footer className={styles}>
                  <div>  
                  {
                    arrCountOf.map((e,i)=> (
                        
                     <button onClick={
                        ()=>{
                            setNum1(((i+1)*PokemonsPorPage)-PokemonsPorPage)
                            setNum2((i+1)*PokemonsPorPage)
                            setCurrent(i+1)
                        }
                     }className={styles.buttonsNavigation}>{i + 1}</button>
                     
                     )
                    )


                  }   
                  </div>
                  <div className={styles.footer_info}>
                    <p>Hello! my name is Lucas Cabrera, welcome to my Pokedex, im a student from Argentina
                      if you want to contact me, i leave my contact below <br></br>
                      <b>cabreralucaspatricio@gmail.com</b>
                    </p>
                    <p></p>
                  </div>
                   </footer>
                    </div>:

                props.state.pokemonFiltered.length === 1 && !props.state.onePokemon.message?
                  
                  <div className={styles.allPokemonBox}>
                  <button onClick={()=>{props.getPokemons()}} className={styles.buttonAllPokemons}>Mostrame todos los Pokemones!</button>                   
                  <div className ={styles.cards}>
                   {props.state.pokemonFiltered.slice(num1,num2).map(element=>(
                    <Link to={`/Pokemons/${element.id}`}>
                     <Cards data={element} key={element.id}/>
                      </Link>)
                      )}
                      </div>
                      </div>:

                     props.state.onePokemon.message?
    
                    <div>
                    <button onClick={()=>{props.getPokemons()
                    props.state.onePokemon={}}} className={styles.buttonsHeader}>Show all Pokemons!</button>
                   <Message></Message></div>:
                   
                   props.state.pokemonFiltered.length===0&&props.state.allPokemons.length? 

                   <div> 
                     <button onClick={()=>{props.getPokemons()
                      props.state.onePokemon = {}
                    }} className={styles.buttonsHeader}>Show all Pokemons!</button>
                   <h1>Empty</h1> 
                    </div>

                    :props.state.allPokemons.length===0&&props.state.tipos.length===0?

                    <div><h1>Loading...</h1></div>:false}


                   
                  </div>
    )
}









const mapStateToProps = (state)=>{
    return {
      state : state
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getTypes : ()=>{dispatch(getTypes())},
        restorePokemons : ()=>{dispatch(restorePokemons())},
        getPokemons : ()=>{dispatch(getPokemons())},
        filterBd : () =>{dispatch(filterBd())},
        filterApi:()=>{dispatch(filterApi())},
        orderByAttackAsc:()=>{dispatch(orderByAttackAsc())},
        orderByAttackDsc:()=>{dispatch(orderByAttackdsc())},
        orderAsc:()=>{dispatch(orderAsc())},
        orderDsc:()=>{dispatch(orderDsc())},
        setPage : ()=>{dispatch(setPage())},
        filterByType : (data)=>{dispatch(filterByType(data))},
        filterByType_ : (data)=>{dispatch(filterByType_(data))},
        
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)