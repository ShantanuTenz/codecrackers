import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick'
import { items } from './item';
import CarouselItem from './CarouselItem';

const MultiItemCarousel = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false
      };

  return (
    <div>
      <Slider {...settings}>
        {items.map((item, index) => (
            <CarouselItem key={index} title={item.title} image={item.img} />
        ))}
      </Slider>
    </div>
  )
}

export default MultiItemCarousel