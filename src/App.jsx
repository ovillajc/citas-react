import { useState, useEffect } from "react";
import PropTypes from 'prop-types';


import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {

  // Prop: para enviar informacion de un componente a otro
  // Obtner info del LS para poder persistir la data
  const [pacientes, setPacientes] = useState(JSON.parse(localStorage.getItem('pacientes')) ?? []);
  const [paciente, setPaciente] = useState({});

  
  // Loscal storage para guardar info
  useEffect(() => {
    // Convertir arreglo a string para poder guardar en local storage
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes]);

  // Eliminar paciente del arreglo
  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id)

    setPacientes(pacientesActualizados)
  }
  
  return (
    <div className="container mx-auto mt-20">
      <Header/>

      <div className="mt-12 md:flex">
        <Formulario 
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
        />
        <ListadoPacientes 
          pacientes={pacientes}
          setPaciente={setPaciente}
          paciente={paciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>

    </div>
  )
}

export default App
