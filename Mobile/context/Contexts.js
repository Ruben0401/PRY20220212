import React from 'react'

const Contexts = React.createContext();

const ContextsProvider =({children})=>{
    const [user, setuser] = React.useState({

        dni_p : '',
        nombres : '', 
        apellidos : '', 
        fecha_nacimiento : '', 
        sexo : '', 
        edad : '', 
        telefono : '', 
        correo : '', 
        direccion : '', 
        password_p : '',
  
      })
      const [logged,setlogged]=React.useState(false)
    return(
        <Contexts.Provider value={{
            user, setuser,logged,setlogged}}>
            {children}
        </Contexts.Provider>
    )
}

export {Contexts,ContextsProvider}