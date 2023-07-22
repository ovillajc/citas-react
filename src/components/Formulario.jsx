import { useState, useEffect } from 'react';
import Error from './Error';

const Formulario = ({pacientes, setPacientes, paciente}) => {
    // Definir el estado del componente
    // Estado del nombre
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState(''); 

    // Mostrar un mensaje de eror en base a las validaciones del formulario
    const [error, setError] = useState(false);

    // Use effect: usado para escuchar los cambios de una variable y actualizar el componente
    // Llenar el formulario al persionar el boton editar
    useEffect(() => {
        // Verificar que no este vacio el paciente
        if(Object.keys(paciente).length > 0) {
            // modificar el state con los datos del paciente (Modificar formulario)
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    }, [paciente]); // Ejecutate solo cuando la dependencia cambie [paciencte]

    

    // Generar id unico para evitar error del key prop
    const generarId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36);

        return random + fecha;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación del formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')) {
            console.log('Hay almenos un campo vacio')

            setError(true)
            return;
        }

        setError(false);

        // Obtener la info del paciente
        // Objeto de pacientes
        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas,
        }
        
        // Verificar si ya existen registros de paciente para poder editar
        if (paciente.id) {
            // Editar el registo
            // Asignar el id previo al nuevo objeto
            objetoPaciente.id = paciente.id

            const pacientesActualizados = pacientes.map(pacienteState => 
                pacienteState.id === paciente.id ? objetoPaciente : pacienteState
            )

            setPacientes(pacientesActualizados)
            // Limpiar el state para no tener muchos recursos en memoria
            setPacientes({})

        } else {
            // Nuevo registro
            // Añadir informacion al arreglo sin modificar el original
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente]);
        }


        // Reiniciar el form
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')   
    }

    return (
        <div className="mx-5 md:w-1/2 lg:w-2/5">
            <h2 className="text-3xl font-black text-center">Seguimiento Pacientes</h2>
            <p className="mt-5 mb-10 text-lg text-center">Añade Pacientes y {''}
            <span className="font-bold text-indigo-600">Administralos</span></p>

            <form 
                onSubmit={handleSubmit}
                className="px-5 py-10 mb-10 bg-white rounded-lg shadow-md">
                
                {/* Enviar elementos a un Children */}
                {error && <Error><p>'Todos los campos son obligatorios'</p></Error>}    
                
                <div className="mb-5">
                    <label htmlFor="mascota" className="block font-bold text-gray-700 uppercase">
                        Nombre Mascota</label>
                    <input
                        id="mascota"
                        type="text"
                        placeholder="Nombre de la mascota"
                        className="w-full p-2 mt-2 placeholder-gray-400 border-2 rounded-md"
                        // Asignar un valor al estado
                        value={nombre}
                        // Registrar un evento en react
                        // setNombre para modificar el estado
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="propietario" className="block font-bold text-gray-700 uppercase">
                        Nombre del propietario</label>
                    <input
                        id="propietario"
                        type="text"
                        placeholder="Nombre del propietario"
                        className="w-full p-2 mt-2 placeholder-gray-400 border-2 rounded-md"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block font-bold text-gray-700 uppercase">
                        Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email del propietario"
                        className="w-full p-2 mt-2 placeholder-gray-400 border-2 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="alta" className="block font-bold text-gray-700 uppercase">
                        Alta</label>
                    <input
                        id="alta"
                        type="date"
                        className="w-full p-2 mt-2 placeholder-gray-400 border-2 rounded-md"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        />
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas" className="block font-bold text-gray-700 uppercase">
                        Sintomas</label>
                    <textarea 
                        id="sintomas"
                        className="w-full p-2 mt-2 placeholder-gray-400 border-2 rounded-md"
                        placeholder="Describe los sintomas"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    className="w-full p-3 font-bold text-white uppercase transition-all bg-indigo-600 cursor-pointer hover:bg-indigo-700"
                    value={paciente.id ? 'Editar paciente' : 'Agregar paciente'}
                />
            </form>
            
        </div>
    )
}

export default Formulario;
