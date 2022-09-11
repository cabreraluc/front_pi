
import {getPokemons,filterApi,filterBd, getPokemonsByName, postPokemon,getTypes} from "../actions/index"
import { useDispatch,useSelector } from "react-redux"
import {Link} from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import styles from "./ModulesCss/createPokemon.module.css"
import { editableInputTypes } from "@testing-library/user-event/dist/utils"





export default  function CreateTuPokemon(){

    const state = useSelector(state => state)     
    const dispatch = useDispatch()




    function ValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)};

    const OnlyNumbers = /^[0-9]*$/;
    const onlyCharacters = /^[a-zA-Z\s]+$/
  




    let [formulario,setFormulario] = useState({
        name:"",
        health:"",
        attack:"",
        defense:"",
        speed:"",
        height:"",
        weight:"",
        type:[],
        img:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/768px-Pok%C3%A9_Ball_icon.svg.png"
    })

  
    const subirAlState = (event)=>{
        if(event.target.name=="name" && onlyCharacters.test(event.target.value) && event.target.value.length<10 || event.target.value=== ""){
            setFormulario((prevState)=>{
            return{
                ...prevState,
                [event.target.name]:event.target.value}})
        }

        if(event.target.name==="img" && ValidURL(event.target.value)){
            setFormulario((prevState)=>{
                return{
                    ...prevState,
                    [event.target.name]:event.target.value}})
        }
        if(OnlyNumbers.test(event.target.value) && event.target.value.length<5 && event.target.value!== "" && event.target.name!=="name" ){
          
            setFormulario((prevState)=>{
                return{
                    ...prevState,
                    [event.target.name]:Number(event.target.value) }})
        }
    }




    const condition= useMemo(()=>{
        if(formulario.name!==""){return false}
        return true
    },[formulario])
    

   
   
    useEffect(()=>{
    dispatch(getTypes())
    },[])
 

    const enviar = ()=>{
        dispatch(postPokemon(formulario))
        setTimeout(() => {
            window.location.href = "/MainPage"
        }, 300);
      
    }

    const handleTypes = (event)=>{
        if(event.target.checked === true){
            setFormulario({
               ...formulario,
               type: [...formulario.type, event.target.name]
            })
               }
               else{
             setFormulario({
               ...formulario,
               type: formulario.type.filter(tipo => tipo !== event.target.name)})
              }

    }




    return(
          <div className={styles.container}>
             <div className={styles.header}>
               
              <Link to ="/MainPage">
              <button   onClick={()=>dispatch(getPokemons())} className={styles.buttons}>Return to main page</button>
              </Link>
             </div>
             <div>
             <div className={styles.body}>
              <form>
                <div className={styles.inputs}>
                 <span className={styles.text}>Name*</span>
                 <input   value={formulario.name} name="name" onChange={(event) => {subirAlState(event)}} className={styles.inputText}/>
                 <span className={styles.text}>Heatlh</span>
                 <input  value={formulario.health} name="health"onChange={(event) => {subirAlState(event)}} className={styles.inputText}/>
                 <span className={styles.text}>Attack damage</span>
                 <input  value={formulario.attack} name="attack" onChange={(event) => {subirAlState(event)}}className={styles.inputText}/>
                 <span className={styles.text} >Defense</span>
                 <input value={formulario.defense} name="defense" onChange={(event) => {subirAlState(event)}}className={styles.inputText}/>
                 <span className={styles.text} >Speed</span>
                 <input  value={formulario.speed}  name="speed" onChange={(event) => {subirAlState(event)}}className={styles.inputText}/>
                 <span className={styles.text} >Height</span>
                 <input value={formulario.height} name="height" onChange={(event) => {subirAlState(event)
                }}className={styles.inputText}/>
                 <span className={styles.text} >Weight</span>
                 <input  value={formulario.weight}  name="weight" onChange={(event) => {subirAlState(event)}}className={styles.inputText}/>
                 <span className={styles.text}>Picture</span>
                 <input name="img" onChange={(event) => {subirAlState(event)}} className={styles.inputText}/>
                </div>  
               </form>

               <div className={styles.types}>
                  <span className={styles.text_types}>Select types</span>

                  <div className={styles.types_box}>         
                   {state.tipos.map(element=>
                    (<div key={element.name} className={styles.types_items}>
                     <span>{element.name}</span>
                     <input type="checkbox" name={element.name} onClick={(event)=>{
                     handleTypes(event)}}>
                     </input>
                    </div>)
                    )}
                </div>    
                 </div>
               </div>

               <button  onClick={enviar} disabled={condition} type="submit" className={styles.button_create}>Create!</button>
               
            </div>
            </div>
    )

}


