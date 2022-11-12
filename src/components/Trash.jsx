import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {getTrash} from "../actions"
import {deleteFromTrash, restoreFromTrash} from "../middlewares/middlewares"
import {VscClose} from "react-icons/vsc"
import {VscDebugRestart} from "react-icons/vsc"
import Cards from "./Cards"
import styles from "./ModulesCss/Trash.module.css"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function Trash(){

const dispatch = useDispatch()
const state = useSelector(state => state)

const [stateDelete, setStateDelete] = useState({lista:[]}) 
const [stateRestore, setStateRestore] = useState({lista:[]}) 


useEffect(()=>{
 dispatch(getTrash())
},[0])



function aplicarCambios(){
    deleteFromTrash(stateDelete.lista)
    restoreFromTrash(stateRestore.lista)
    setTimeout(() => {
        dispatch(getTrash())
    }, 3000);
    
    setStateRestore({lista:[]})
    setStateDelete({lista:[]})
    
}

function handlerSubirAlStateDelete(element){
    if(!stateRestore.lista.includes(element.name)){
        if(!stateDelete.lista.includes(element.name)){
            setStateDelete({...stateDelete,lista:[...stateDelete.lista, element.name]})
        }
        if(stateDelete.lista.includes(element.name)){
            setStateDelete({
                ...stateDelete,lista:stateDelete.lista.filter(e => e!==element.name)
            })
        }
    }
    if(stateRestore.lista.includes(element.name)){
        setStateRestore({
            ...stateRestore,lista:stateRestore.lista.filter(e => e!==element.name)
        })
        if(!stateDelete.lista.includes(element.name)){
            setStateDelete({...stateDelete,lista:[...stateDelete.lista, element.name]})
        }
    }
}

function handlerSubirAlStateRestore(element){
    if(!stateDelete.lista.includes(element.name)){
        if(!stateRestore.lista.includes(element.name)){
            setStateRestore({...stateRestore,lista:[...stateRestore.lista, element.name]})
        }
        if(stateRestore.lista.includes(element.name)){
            setStateRestore({
                ...stateRestore,lista:stateRestore.lista.filter(e => e!==element.name)
            })
        }
        
    }
    if(stateDelete.lista.includes(element.name)){
        
        setStateDelete({
            ...stateDelete,lista:stateDelete.lista.filter(e => e!==element.name)
        })
        if(!stateRestore.lista.includes(element.name)){
            setStateRestore({...stateRestore,lista:[...stateRestore.lista, element.name]})
        }
    }
}


return (
    <div className={styles.container}>
      
        <div className={styles.header}>
         <Link to ="/MainPage">
         <button className={styles.buttonsHeader}>Return to main page</button>
         </Link>
         <button className={styles.buttonsHeader} onClick={()=>{aplicarCambios()}} >Apply changes</button>
        </div>
      <div className={styles.body}>
      
                <div className={styles.card_box}>
             {!state.trashPokemons.length?
              (<div className={styles.empty}>Empty</div>)
              :
              
             
                state.trashPokemons.map(element =>{
                return(

                                       
                        <div>
                           
                        <div className={styles.card}>
                            <img className={styles.img} src={element.img} alt="pokemon_img" />

                        <div className={styles.card_data}>
                            <h3 className={styles.name} >{element.name}</h3>
                            <h3 className={styles.types}>PokeNumber: {element.id}</h3>
                        </div>
                        

                            {stateDelete.lista.includes(element.name)?
                            ( <div className={styles.buttons_card}> <button onClick={()=>{
                                handlerSubirAlStateDelete(element)
                                    }} className={styles.button_delete_pressed} ><VscClose></VscClose></button>
                                    <button onClick={()=>{
                                    handlerSubirAlStateRestore(element)
                                    }} className={styles.button_restore}><VscDebugRestart/></button>
                                    </div> )
                            :stateRestore.lista.includes(element.name)?
                            ( <div className={styles.buttons_card}> <button onClick={()=>{
                                handlerSubirAlStateDelete(element)
                                    }} className={styles.button_delete}><VscClose></VscClose></button>
                                    <button onClick={()=>{
                                    handlerSubirAlStateRestore(element)
                                    }} className={styles.button_restore_pressed}><VscDebugRestart/></button>
                                    </div> )
                            :
                            
                            
                            (<div className={styles.buttons_card}>
                                <button onClick={()=>{
                                handlerSubirAlStateDelete(element)
                                    }} className={styles.button_delete}><VscClose></VscClose></button>
                                    <button onClick={()=>{
                                    handlerSubirAlStateRestore(element)
                                    }} className={styles.button_restore}><VscDebugRestart/></button>  </div> )
                            }
                     
                       
                      
                        </div>
                        </div>
                         
                      )
            })
          
            
            }  
            </div>
                   
                   
          </div>
        </div>
)

}
