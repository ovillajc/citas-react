import Paciente from "./Paciente";

const ListadoPacientes = ({pacientes, setPaciente, eliminarPaciente}) => {    

    return (
        <div className="overflow-y-scroll md:h-screen md:w-1/2 lg:3/5">

            {pacientes && pacientes.length ? (
                <>
                    <h2 className="text-3xl font-black text-center">ListadoPacientes</h2>
                    <p className="mt-5 mb-10 text-xl text-center">
                        Administra tus {''}
                        <span className="font-bold text-indigo-600">Pacientes y Citas</span>
                    </p>

                    {/* Iterar en un arreglo con map */}    
                    {pacientes.map((paciente) => (
                        <Paciente 
                            // Key unico para poder iterar un arreglo en otro componente desde props
                            key={paciente.id}
                            paciente={paciente}
                            setPaciente={setPaciente}
                            eliminarPaciente={eliminarPaciente}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2 className="text-3xl font-black text-center">No hay Pacientes</h2>
                    <p className="mt-5 mb-10 text-xl text-center">
                        Comienza agregando pacientes {''}
                        <span className="font-bold text-indigo-600">y aparecenrán en este lugar</span>
                    </p>
                </>
            )}
            
            
        </div>
    )
}

export default ListadoPacientes;