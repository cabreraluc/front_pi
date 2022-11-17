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
import {IoIosOptions} from "react-icons/io"
import Swal from 'sweetalert2'
import {VscClose} from "react-icons/vsc"





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
    const [showOptions, setShowOptions] = useState(false)
    
   

   
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
    let timerInterval
    Swal.fire({
        title: 'Restoring Pokemons deleted...',
        html: '',
        timer: 2000,
        timerProgressBar: false,
        didOpen: () => {
          props.restorePokemons()
          props.state.onePokemon = {}
          Swal.showLoading()
          const b = Swal.getHtmlContainer().querySelector('b')
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
          window.location.reload()
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
   

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
      
        let timerInterval
        Swal.fire({
            title: 'Sending to trash!',
            html: '',
            timer: 2000,
            timerProgressBar: false,
            didOpen: () => {
              Swal.showLoading()
              const b = Swal.getHtmlContainer().querySelector('b')
              timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
              window.location.reload()
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })
     
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
 
                <div
                className={styles.sliceOptions} 
                style={showOptions?{
                  "position":"absolute",
                  "margin-left":"-0%",
                  "display":"flex",
                  "flexDirection":"column",
                  "backgroundColor":"rgb(0, 0, 0,0.9)",
                  "width":"100%",
                 
                  "transition":"0.5s",
                  "zIndex":"3",
                  "paddingBottom":"3rem"
                }:{
                  "position":"absolute",
                  "margin-left":"-200%",
                  "display":"flex",
                  "flexDirection":"column",
                  "backgroundColor":"rgb(0, 0, 0,0.9)",
                  "width":"100%",
                 
                  "paddingBottom":"3rem",
                  "transition":"0.5",
                  "zIndex":"3"
                }
                }>
                  <div className={styles.buttonCloseOptionsBox}>
                  <button
                  onClick={()=>setShowOptions(!showOptions)}
                  className={styles.buttonCloseOptions}
                  ><VscClose/></button>
                  </div>
                 
                  <div className={styles.filter_box}>
                   
                   <form>
                     <label className={styles.filter_text}>Api/Db</label>
                     <select className={styles.filters} name="" id="" onChange={(event)=>restSelector(event.target.value)} defaultValue="base">
                       <option disabled={true} value= "base">-------</option>
                       <option value="api">API</option>
                       <option value="db">DB</option>
                     </select>
                   </form>
                   
                   <form>
                     <label className={styles.filter_text}>By attack</label>
                     <select className={styles.filters} onChange={(event)=>restSelector(event.target.value)} defaultValue="base">
                       <option  disabled={true} value="base">-------</option>
                       <option value="fuerte">Strongest</option>
                       <option value="debil">Weaknest</option>
                     </select>
                   </form>
                   
                   <form>
                     <label className={styles.filter_text}>Alphabetic</label>
                     <select  className={styles.filters} name="" id=""  onChange={(event)=>restSelector(event.target.value)} defaultValue="base">
                       <option disabled={true} value="base">-------</option>
                       <option value="a-z">A-Z</option>
                       <option value="z-a">Z-A</option>
                     </select>
                   </form>
                
                   <form>
                   <label className={styles.filter_text}>Type</label>
                     <select  className={styles.filters} name="tipos" onChange={(event)=>{tiposSelector(event.target.value)}} defaultValue="base">
                       <option  disabled={true} value="base">-------</option>
                       {props.state.tipos.map(element => {
                         return(<option value={element.name}>{element.name}</option>)
                       })}
                     </select>
                   </form>

                     
                      
                    

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
                             <div className={styles.buttonsOptionsBox}>
                  <button className={styles.buttonsHeader}>
                  <Link to="/CreatePokemon"> 
                    Create Pokemon!</Link></button >
              
               <button onClick={()=>{
                        if(props.state.allPokemons.length<40){handleRestorePokemons()}
                      }} className={styles.buttonsHeader}>Reload pokemons</button>
                             </div>
        </div>
         

                </div>
                   
                <div className={styles.header}>


                  <button className={styles.buttonsHeader_options}
                  onClick={()=>setShowOptions(!showOptions)}
                  >
                    <IoIosOptions/>
                  </button>
                
                    
    <SearchBar handleReset={handleReset} ></SearchBar>
               
                     
                 
               
                  </div>      
              
                  

                  <div>
                
                    
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
                    
                    <div className={styles.trash_box}>
                    <button onClick={()=>{
                      props.getPokemons()
                      props.state.onePokemon = {}
                      }}  className={styles.trash}>Show all!</button>
                      <Link to="/Trash">
                       <button  className={styles.trash}>
                        <FaRegTrashAlt /> Recycle bin
                       </button>
                      </Link>
                    </div>

                    <div className={styles.cards_arrows}>
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
                
                  
                    
                  </div>

                  
                 
                  <div className={styles.numbers_nav_box}>  
                  {
                    arrCountOf.map((e,i)=> (
                        
                     <button onClick={
                        ()=>{
                            setNum1(((i+1)*PokemonsPorPage)-PokemonsPorPage)
                            setNum2((i+1)*PokemonsPorPage)
                            setCurrent(i+1)
                        }
                     }className={styles.buttonsNavigation}>{i + 1}
                     </button>
                     
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

                    <div><h5>Loading...</h5></div>:false}


                   
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