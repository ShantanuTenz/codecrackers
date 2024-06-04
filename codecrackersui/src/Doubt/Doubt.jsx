import DoubtCard from './DoubtCard';
import study from '../Images/LearnTopic.png'
import youtube from '../Images/Youtube.png'
import comingsoon from '../Images/ComingSoon.png'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../State/Authentication/Action';
import { useMediaQuery } from '@mui/material';

const doubtCardContent = [
  {
    image : study,
    text: "Suggest Any Topic!"
  },
  {
    image : youtube,
    text: "YouTube"
  },
  {
    image : comingsoon,
    text: "Coming soon..."
  }
];

const Doubt = () => {

  const navigate = useNavigate();
  const {auth} = useSelector( store => store );
  console.log("yeh rha user", auth.user);

  const dispatach = useDispatch();
  const handleNavigate = ()=> {
    dispatach(logout());
    navigate("/");
  }

  const handleLiveChat = () => {
    if(auth.user != null){
      navigate("/doubt/live");
    }
    else{
      navigate("/account/login");
    }
  }

  const handlePersonalChat = () => {
    if(auth.user != null){
      navigate("/doubt/personal");
    }
    else{
      navigate("/account/login");
    }
  }

  const isLarge = useMediaQuery("(max-width: 767px)");

  return (
    <div className='w-[100%] h-[80rem] mt-[5rem] z-10'> 
      <div className='absolute w-[100%] mt-[2rem] flex justify-center'>
        <div style={{
            gap: isLarge ? '5vw' : '2rem',
          }} className='absolute w-[100%] mt-[2rem] flex justify-center text-center align-middle'>
          <button onClick={handleLiveChat} style={{
            fontSize: isLarge ? '0.8rem' : '1.125rem',
            lineHeight: isLarge ? '1rem' : '1.75rem',
            padding: isLarge ? '0.4rem 1rem' : '0.5rem 3rem'
          }} className='sedan-regular bg-blue-400 hover:bg-blue-700 text-white rounded-sm'>Live Doubt</button>
          <button onClick={handlePersonalChat} style={{
            fontSize: isLarge ? '0.8rem' : '1.125rem',
            lineHeight: isLarge ? '1rem' : '1.75rem',
            padding: isLarge ? '0.4rem 1rem' : '0.5rem 3rem'
          }} className='sedan-regular bg-yellow-400  hover:bg-yellow-700 text-white rounded-sm'>Personal Doubt</button>
          <button onClick={handleNavigate} style={{
            fontSize: isLarge ? '0.8rem' : '1.125rem',
            lineHeight: isLarge ? '1rem' : '1.75rem',
            padding: isLarge ? '0.4rem 1rem' : '0.5rem 0.5rem'
          }} className='sedan-regular bg-red-400  hover:bg-red-700 text-white px-6 py-2 rounded-sm'>Logout</button>
        </div>
        <div style={{
            fontSize: isLarge ? '1.28rem' : '1.5rem',
            lineHeight: isLarge? '1.5rem' : '2rem',
            padding: isLarge? '0rem 2rem' : '0rem 3rem'
          }} className='mt-[6rem] sedan-regular'>
          <p>Unraveling uncertainties <span className='text-yellow-400 sedan-regular-italic'>with every query</span>, together step by step</p>
        </div>
      </div>
 
      <div 
          style={{
            height: isLarge ? '50vh' : '40rem',
            top: isLarge ? '21.333333%' : '23.333333%',
          }}
 
          className='absolute w-[100%] flex'>
        <div style={{
                height: isLarge ? '100%' : '35%',
                gap: isLarge ? '3vh' : '',
                justifyContent: isLarge ? 'center' : 'space-evenly',
                position : isLarge ?  'absolute' : '',
                left: isLarge ? '14vh' : '',
             }}
           className={`w-[100%] flex ${isLarge ? 'flex-col' : 'flex-row'}`}>
          {doubtCardContent.map((item, index) => (
            <DoubtCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Doubt;
