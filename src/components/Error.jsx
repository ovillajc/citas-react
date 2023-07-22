// Children hace referencia a todo lo que le pases a un componente
const Error = ({children}) => {
    return (
        <div className='p-3 mb-3 font-bold text-center text-white uppercase bg-red-600 rounded-md'>
            {children}
        </div>
    )
}

export default Error;