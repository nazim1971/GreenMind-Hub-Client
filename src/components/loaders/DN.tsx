'use client'
import Lottie from "lottie-react"
import DN from "../../assets/daynightLoader.json";

const DNLoader = () => {
  return (
    <div>
      <Lottie animationData={DN} loop={true} />
    </div>
  )
}

export default DNLoader