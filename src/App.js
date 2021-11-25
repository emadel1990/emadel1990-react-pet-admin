import React, {useState, useEffect} from 'react'
import Form from './components/Form';
import Cita from './components/Cita';


const App = () => {

  //Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  
  //State de citas
  const [citas, guardarCitas] = useState(citasIniciales ? citasIniciales : [])
  //Use Efefct para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  },[citas, citasIniciales]);
  //Funcion que tome las citas actuales y agrega la nueva
  const crearCita = cita =>{
    guardarCitas([...citas , cita]);
  }
  //Funcion que elimina una cita por su ID
  const eliminarCita = id =>{
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    guardarCitas(nuevasCitas);
  }
  // Mensaje condicional
  const mensajeCita = () => {
    if(!citas.length){
      return <h2>Agregar una Cita</h2>
    } else return <h2>Administra tus citas</h2>;
  }
  return (
    <div>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
          <Form
            crearCita={crearCita}
          />
          </div>
          <div className="one-half column">
            {mensajeCita()} 
            {citas.map(cita =>(
              <Cita
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

