import React, { useEffect, useState } from 'react';
import icon from './tick.gif';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from '@mui/material';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const { auth } = useSelector(store => store);
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to fetch payment confirmation details
        const fetchPaymentDetails = async () => {
            try {
                const response = await axios.get('/api/users/confirmation', {
                    headers: {
                        Authorization: `Bearer ${auth.jwt}` // Assuming you store the token in auth object
                    }
                });
                setPaymentDetails(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching payment details:', error);
                setLoading(false);
            }
        };

        fetchPaymentDetails();
    }, [auth.jwt]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='w-[100%] h-[50rem] mt-[5rem] z-10 sedan-regular text-green-400'>
            <div className='absolute w-[100%] h-[50rem] pt-[5rem] flex flex-col text-center bg-white'>
                <div className='w-full text-xl'>
                    <div className='w-full flex justify-center mb-5'>
                        <img className='rounded-full' src={icon} alt="" />
                    </div>
                    <p className='mb-3'>Good Job, {auth.user?.fullName}!</p>
                    <p className='mb-5'>Payment Successful</p>
                    {paymentDetails && (
                        <div className='mb-5'>
                            <p>Payment ID: {paymentDetails.paymentId}</p>
                            <p>Amount: ${paymentDetails.amount / 100}</p>
                            <p>Status: {paymentDetails.status}</p>
                        </div>
                    )}
                    <Button variant="contained" color="primary" onClick={() => navigate("/")}>
                        Home
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccess;
