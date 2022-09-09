export const deletePokemons = (lista)=>{
 
    fetch("https://pokedex-h.herokuapp.com/delete",{
            method: "POST",
            headers:{"Accept": "application/json",
           "Content-Type":"application/json"},
                          
         body:JSON.stringify(lista)
            }
        )
  }
  
  export const deleteFromTrash = (lista)=>{
    fetch("https://pokedex-h.herokuapp.com/deleteFromTrash",{
         method: "POST",
         headers:{"Accept": "application/json",
        "Content-Type":"application/json"},
                       
      body:JSON.stringify(lista)
         }
     )
  }
  
  
  
  
  export const restoreFromTrash = (lista)=>{
     fetch("https://pokedex-h.herokuapp.com/RestoreFromTrash",{
          method: "POST",
          headers:{"Accept": "application/json",
         "Content-Type":"application/json"},
                        
       body:JSON.stringify(lista)
          }
      )
  }