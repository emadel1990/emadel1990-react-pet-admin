import React, { Fragment, useState } from 'react'
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

function Form({crearCita}) {

    //Crear state de citas
    const [ cita , setCita] = useState({
        id: '',
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });
    const [ error , setError ] = useState(false);
    //Funcion que se ejecuta cada vez que el usuario escribe en un input
    const handleChange = (e) =>{
        setCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }
    //Extraer los valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;
    //Cuando el usuario presiona agregar cita
    const submitCita=(e)=>{
        e.preventDefault();
        
        //Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || 
            hora.trim() === '' || sintomas.trim() === ''){
            setError(true);
            return;

        }
        // Eliminar mensaje previo
        setError(false);
        //Asignar un ID
        cita.id = uuid();
        
        //Crear la cita
        crearCita(cita);

        //Reiniciar el form
        setCita({
            id: '',
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }
    return (
       <Fragment>
           <h2>Crear Cita</h2>
           { error 
           ? <p className="alerta-error">Todos los campos son obligatorios</p>
           : null
           }
           <form
                onSubmit={submitCita}
           >
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="nombre mascota"
                    onChange={handleChange}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="nombre dueño"
                    onChange={handleChange}
                    value={propietario}
                />
                <label>Fecha de Alta</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={handleChange}
                    value={fecha}
                />
                <label>Hora de Alta</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={handleChange}
                    value={hora}
                />
                <label>Sintomas</label>
                <textarea 
                    className="u-full-width"
                    name="sintomas"
                    onChange={handleChange}
                    value={sintomas}
                ></textarea>     
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
           </form>
       </Fragment>
    )
}

Form.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Form
