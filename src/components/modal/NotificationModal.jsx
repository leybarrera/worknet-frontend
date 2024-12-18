import LottieView from 'lottie-react'
import congratulations from '../../assets/congratulations.json'

const NotificationModal = () => {
  return (
    <div className="absolute w-full h-full bg-white left-0 top-0 z-50 flex flex-col justify-center items-center p-4 text-center">
      <LottieView
        animationData={congratulations}
        autoPlay
        loop={false}
        style={{ width: '300px', height: '300px' }}
      />
      <h2 className="text-4xl font-bold mt-4 text-gray-800">
        ¡Felicidades! 🎉
      </h2>
      <p className="text-2xl text-gray-600 mt-5 max-w-[600px] ">
        Has completado toda la información de tu perfil. Ahora, las empresas y
        otros usuarios podrán saber más sobre ti y descubrir tu potencial.
      </p>
    </div>
  )
}

export default NotificationModal
