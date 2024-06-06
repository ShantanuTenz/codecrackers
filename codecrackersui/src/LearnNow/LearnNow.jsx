import dsa from './DsaImg.webp'
import webD from './webD.jpeg'
import MultiItemCarousel from './MultiCrousel';


const LearnNow = () => {
  
  return (
    <div className='w-[100%] h-[100vh] mt-[5rem] z-100 sedan-regular relative'>
      <div className="w-full text-center text-4xl pt-10">
          Welcome to CodeCrackers
      </div>
      <div className="w-full h-[20rem] mt-2 flex text-black">

        <div className="w-1/2 flex items-center justify-center">
          <div className='w-1/2 h-[15rem] bg-white flex items-center flex-col cursor-pointer'>
            <img className='w-full h-[10rem]' src={webD} alt="" />
            <p className='text-xl mt-5 '>Web Development</p>
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-center">
        <div className='w-1/2 h-[15rem] bg-white flex items-center flex-col cursor-pointer'>
            <img className='w-full h-[10rem]' src={dsa} alt="" />
            <p className='text-xl mt-5'>Data structure Algorithms</p>
          </div>
        </div>

      </div>
      <div className="w-full text-black flex justify-center">
        <div className='w-[80%]'>
          <MultiItemCarousel />
        </div>
      </div>
    </div>
  )
}

export default LearnNow