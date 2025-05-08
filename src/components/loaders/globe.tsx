'use client'
import Lottie from "lottie-react"
import globe from "../../assets/globeLoader.json";

const GlobeLoader = () => {
  return (
    <div>
      <Lottie animationData={globe} loop={true} />
    </div>
  )
}

export default GlobeLoader