import { useMediaQuery } from "@uidotdev/usehooks";

const DoubtCard = ({ item }) => {
  const isLarge = useMediaQuery("(max-width: 767px)");

  return (
    <div  style={{
            width: isLarge ? '20vh' : '20%',
            overflow: isLarge ? '' : 'hidden'
          }}
      className='shadow-xl rounded-xl hover:scale-75 relative pb-5 bg-white overflow-hidden'>
      <div style={{
            position: isLarge ? '' : 'absolute',
            inset: isLarge ? '' : '0'
          }} className='flex flex-col justify-center items-center'>
        <div style={{
            width: isLarge ? '50%' : '60%',
          }}
        >
          <img className='w-full' src={item.image} alt="" />
        </div>
        <div style={{
              fontSize: isLarge ? '2vh' : '1.125rem',
              lineHeight: isLarge ? '1rem' : '1.75rem',
             }}
          className='sedan-regular text-center mt-4 text-black'>
          {item.text}
        </div>
      </div>
    </div>

  )
}

export default DoubtCard;
