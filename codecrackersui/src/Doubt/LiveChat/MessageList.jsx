import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useMediaQuery } from '@mui/material';

function MessageList() {
    const [messages, setMessages] = useState([]);
    const messageContainerRef = useRef(null);
    const isLarge = useMediaQuery("(max-width: 767px)");

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:8080/doubt/messages', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`
                    }
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [messages]);


    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    return (
        <div 
         className='width-[100%] flex justify-center mt-5'>
            <div
                className='shadow-2xl'
                ref={messageContainerRef}
                style={{
                    width: isLarge ? '85%' : '60%',
                    height: isLarge ? '60vh' : '300px',
                    overflowY: 'scroll',
                    border: '2px solid black',
                    padding: '1rem'
                }}
            >
                {messages.map(message => (
                    <p className='cursor-pointer' key={message.id}>&#x2022; <strong>{message.sender}:</strong> {message.content}</p>
                ))}
            </div>
        </div>
    );
}

export default MessageList;
