import { RiOpenaiFill } from "react-icons/ri";
import { FaHandHoldingHeart } from "react-icons/fa";
const Homepage = () => {
  return (
    <div className='home-page'>

      <span className="type">
        <span>Chat with your own Intellichat</span>
      </span>

      <div className='two-photo'>
      <img src="https://media0.giphy.com/media/QuUM1XM1zlYzy0AEkz/source.gif" className='homo'/>
      <div className='image-container'><RiOpenaiFill  className='Homo-ai'/></div>
      </div>

      <div className="container">
      <div className="rotating-wrapper">
      <img src="https://png.pngtree.com/png-clipart/20230419/original/pngtree-artificial-intelligence-ai-system-technology-background-png-image_9068339.png" alt="AI Image" className="rotating-image"/>
      </div>
      </div>
      <h3 className='last-para'>Built With <FaHandHoldingHeart className='love'/> Love <FaHandHoldingHeart className='love'/> by <span className='sour'>  Sourabh</span></h3>
    </div>
  )
}

export default Homepage