const CarouselItem = ({image, title}) => {
    return (
      <div className="w-[8rem] h-[8rem] rounded-full flex flex-col justify-center items-center relative">
          <img className="w-[8rem] h-[8rem] rounded-full object-cover object-center" src={image} alt="" />
          <span className="absolute bottom-[-1rem] left-[1rem] font-semibold text-sm text-black">
              {title}
          </span>
      </div>
    )
  }
  
  export default CarouselItem