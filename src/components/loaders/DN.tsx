'use client'
import Lottie from "lottie-react"
import globeLoader from "../../assets/globeLoader.json";

const DNLoader = () => {
  return (
    <div>
      <Lottie animationData={globeLoader} loop={true} />
    </div>
  )
}

export default DNLoader