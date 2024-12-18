import './Loader.css'

const Loader = ({ text }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-5 justify-center items-center bg-white z-50">
      <div className="loader"></div>
      <p className="text-lg text-gray-600 mt-2 font-bold">
        {text || 'Cargando...'}
      </p>
    </div>
  )
}

export default Loader
