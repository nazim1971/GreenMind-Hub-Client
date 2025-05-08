'use client'
import Lottie from "lottie-react"
import Solar from "../../assets/solarLoader.json";

const SolarLoader = () => {
  return (
    <div>
      <Lottie animationData={Solar} loop={true} />
    </div>
  )
}

export default SolarLoader