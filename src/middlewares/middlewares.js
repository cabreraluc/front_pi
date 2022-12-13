export const deletePokemons = (lista)=>{
 
    fetch("https://backendpi-96qn.onrender.com/delete",{
            method: "POST",
            headers:{"Accept": "application/json",
           "Content-Type":"application/json"},
                          
         body:JSON.stringify(lista)
            }
        )
  }
  
  export const deleteFromTrash = (lista)=>{
    fetch("https://backendpi-96qn.onrender.com/deleteFromTrash",{
         method: "POST",
         headers:{"Accept": "application/json",
        "Content-Type":"application/json"},
                       
      body:JSON.stringify(lista)
         }
     )
  }
  
  
  
  
  export const restoreFromTrash = (lista)=>{
     fetch("https://backendpi-96qn.onrender.com/RestoreFromTrash",{
          method: "POST",
          headers:{"Accept": "application/json",
         "Content-Type":"application/json"},
                        
       body:JSON.stringify(lista)
          }
      )
  }