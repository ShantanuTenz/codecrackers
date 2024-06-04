import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './head.css'
import '../font.css'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import store from '../store'
import axios from 'axios';
import { useMediaQuery } from '@mui/material';
import { Divider } from '@mui/material';

const Header = ({toggleDarkTheme}) => {

  const navigate = useNavigate();
  const { auth } = useSelector(state => state);

  const handleDoubtButtonClick = () => {
    navigate("/doubt");
    setMenuOpen(false);
  };

  const isLarge = useMediaQuery("(max-width: 767px)");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  const handleMenuItemClick = (path) => {
    setMenuOpen(false); // Close menu after clicking on a link
    navigate(path);
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    toggleDarkTheme(!isDarkMode);
  };

  return (
    <div className='head font text-lg flex items-center z-10 fixed top-0 left-0 right-0'>
        <div className='logo sedan-regular text-xl'> 
            <Link to="/">Code Crackers</Link>
        </div>
        {isLarge ? (
          <div className='flex text-center w-[10%] ml-6'>
            <MenuIcon onClick={handleMenuToggle} />
          </div>
        ) 
        :
        (
          <div className={`${isLarge ? 'flex-small' : 'flex-big'} w-[55%] items-center justify-end`}>
            <div className='flex justify-around w-[60%] items-center'>
            <div className='sedan-regular'>
              <Link to="/about">ABOUT</Link>
            </div>
            <div className='sedan-regular cursor-pointer'>
              {auth.user ? (
                    <div onClick={handleDoubtButtonClick}>DOUBT</div>
                    )
                    :
                    (
                    <div onClick={()=> navigate("/account/login")}>DOUBT</div>
                    )
              }
            </div>
            <div className='sedan-regular'>
              <Link to="/learn">LEARN NOW</Link>
            </div>
            </div>
          </div>
        )}

        {isLarge && menuOpen && (
          <div className='absolute z-40 top-16 right-5 left-5 text-center bg-white text-black shadow-lg p-4'>
            <div className='sedan-regular cursor-pointer mb-2' onClick={() => handleMenuItemClick('/')}>Home</div>
            <Divider style={{ backgroundColor: 'black' }}/>
            <div className='sedan-regular cursor-pointer mb-2 mt-2' onClick={() => handleMenuItemClick('/about')}>About</div>
            <Divider style={{ backgroundColor: 'black' }} />
            <div className='sedan-regular cursor-pointer mb-2 mt-2'>
              {auth.user ? (
                    <div onClick={handleDoubtButtonClick}>Doubt</div>
                    )
                    :
                    (
                    <div onClick={()=> handleMenuItemClick("/account/login")}>Doubt</div>
                    )
              }
            </div>
            <Divider style={{ backgroundColor: 'black' }} />
            <div className='sedan-regular cursor-pointer mt-2' onClick={() => handleMenuItemClick('/learn')}>Learn Now</div>
          </div>
        )}

        <div  className='flex w-[10%]'>
          {isDarkMode ? (
                          <WbSunnyIcon onClick={handleDarkModeToggle} />
                        ) : (
                          <DarkModeIcon onClick={handleDarkModeToggle} />
                        )
          }

        </div>
    </div>
  )
}

export default Header