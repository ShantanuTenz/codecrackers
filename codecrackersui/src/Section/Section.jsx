import logo from './circlelogo.png'
import { TypeAnimation } from 'react-type-animation';

const Section = () => {
    
  return (
    <div className='mt-[5rem] w-[100%] h-[100vh] relative'>
        <div className='absolute top-[5rem] left-[6%]'>
            <div className='sedan-regular text-xl leading-loose'>
                <TypeAnimation
                    sequence={[
                    `CONSISTENCY!\nCLARITY\nCREATIVITY`,
                    1000,
                    "",
                    ]}
                    style={{ whiteSpace: 'pre-line', fontSize: '2em' }}
                    repeat={Infinity}
                />
            </div>
            <div>
                <img className='w-20 h-20 rounded-full' src={logo} alt=""/>
            </div>
        </div>
        
        {/* second div start here right side div */}
        <div>

        </div>
    </div>
  );
};

export default Section;
