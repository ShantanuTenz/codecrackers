import { useMediaQuery } from '@uidotdev/usehooks';
import './page.css';

const Page = ({ id, title, content, onNext, onPrev }) => {
  
  const isLarge = useMediaQuery("(max-width: 767px)");

  return (
    <div style={{
      padding: isLarge ? '0.5rem' : '1rem',
    }} className="page absolute sedan-regular">
      <h1 style={{
              fontSize: isLarge ? '3vh' : '1.5rem',
              lineHeight: isLarge ? '4vh' : '2rem',
              color: "#777777"
            }} className='mb-2'>{title}</h1>
      <p style={{
            fontSize: isLarge ? '2vh' : '1rem',
            lineHeight: isLarge ? '3vh' : '1.5rem',
            color: "#2e3d49"
          }} >{content}</p>
      <div className="buttons">
        {onPrev && <button className='w-40 h-8 bg-orange-500 text-white mr-2' onClick={() => onPrev(id)}>Previous</button>}
        {onNext && <button className='w-40 h-8 bg-blue-500 text-white' onClick={() => onNext(id)}>Next</button>}
      </div>
    </div>
  )
};

export default Page;