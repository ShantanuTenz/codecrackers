// MessageForm.js
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import store from '../../store';
import { useMediaQuery } from '@mui/material';

function MessageForm() {
    const [content, setContent] = useState('');
    const isLarge = useMediaQuery("(max-width: 767px)");

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = { content };
        axios.post('http://localhost:8080/doubt/messages', message, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })
            .then(response => {
                console.log('Message sent:', response.data);
                setContent('');
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    };

    const {auth} = useSelector(store => store);  


    return (
        <div style={{
                marginBottom: isLarge ? '0rem' : '1rem',
                height: isLarge ? '' : '18vw',
                alignItems: isLarge ? '' : 'center',
                marginTop: isLarge? '1rem' : '',
             }} 
        className="w-[100%] sedan-regular flex justify-center  shadow-2xl">
            <form onSubmit={handleSubmit} 
            style={{
                // top: isLarge ? '2rem' : '0.5rem',
                width: isLarge ? '85%' : '100%',
            }}
           className="z-100 text-black max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8">
                <div style={{
                    marginBottom: isLarge ? '0rem' : '1rem'
                }}>
                    <textarea
                        className="w-full marker:overflow-auto resize-none border rounded-md p-2"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Message"
                        required
                    />
                </div>
                <div className="w-full flex gap-10 justify-center items-center">
                    <span style={{
                                fontSize: isLarge ?  '1rem' : '1.25rem',
                          }}
                    className='text-xl text-blue-700'>{auth.user?.fullName}</span>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Send <SendIcon className="ml-2" />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default MessageForm;
