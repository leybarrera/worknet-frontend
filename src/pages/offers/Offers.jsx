import { useEffect } from 'react'
import { storageUtil } from '../../utils/index.utils'
import { useDispatch, useSelector } from 'react-redux'
import { offersAPI } from '../../api/ofertas/ofertas.api'
import { setOfertas } from '../../redux/slices/ofertas.slices'
import LottieView from 'lottie-react'
import noData from '../../assets/no-data.json'

const Offers = () => {
  const dispatch = useDispatch()
  const { ofertas } = useSelector((state) => state.ofertas)
  useEffect(() => {
    offersAPI
      .getAll()
      .then((res) => {
        const { jobOffers } = res.data
        dispatch(setOfertas(jobOffers))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <div className="w-full h-full flex-1 flex flex-col justify-center items-center">
      <LottieView
        animationData={noData}
        autoPlay
        loop={true}
        style={{ width: '300px', height: '300px' }}
      />
      <h2 className="text-3xl font-semibold mt-4 text-gray-400 text-center">
        No se encontraron ofertas disponibles.
      </h2>
    </div>
  )
}

export default Offers
