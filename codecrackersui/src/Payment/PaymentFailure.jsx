import React from 'react'
import { useNavigate } from 'react-router-dom'
const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className='w-[100%] h-[50rem] mt-[5rem] z-10 sedan-regular text-green-400'> 
      <div className='absolute w-[100%] h-[50rem] pt-[5rem] flex flex-col text-center bg-white'>
        <div className='w-full'>
            <p className='mb-5 text-2xl text-[#ff3333]'>Payment Failure</p>
            <button className='bg-black pt-2 pb-2 pl-5 pr-5 rounded' onClick={()=> navigate("/doubt/personal")}>
                Try Again
            </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentFailure