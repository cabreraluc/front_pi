export const deletePokemons = (lista)=>{
 
    fetch("http://localhost:3001/delete",{
            method: "POST",
            headers:{"Accept": "application/json",
           "Content-Type":"application/json"},
                          
         body:JSON.stringify(lista)
            }
        )
  }
  
  export const deleteFromTrash = (lista)=>{
    fetch("http://localhost:3001/deleteFromTrash",{
         method: "POST",
         headers:{"Accept": "application/json",
        "Content-Type":"application/json"},
                       
      body:JSON.stringify(lista)
         }
     )
  }
  
  
  
  
  export const restoreFromTrash = (lista)=>{
     fetch("http://localhost:3001/RestoreFromTrash",{
          method: "POST",
          headers:{"Accept": "application/json",
         "Content-Type":"application/json"},
                        
       body:JSON.stringify(lista)
          }
      )
  }