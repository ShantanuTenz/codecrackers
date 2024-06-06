import { Button, useMediaQuery } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'
import { Box, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const Admin = () => {

  const [doubts, setDoubts] = React.useState([]);

  useEffect(() => {
    const fetchDoubts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin/findDoubts', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            });
            setDoubts(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };
        fetchDoubts();
    }, []);
    
    const handleStatus = async (orderId)=> {
        try {
            const response = await axios.put(`http://localhost:8080/admin/${orderId}/status`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            });
            console.log(response);

            setDoubts((prevDoubt) => 
                prevDoubt.map((doubt) => (
                    doubt.id === orderId ? {...doubt, status: !doubt.status} : doubt
                ))
            );

        } catch (error) {
            console.error('Error fetching doubts:', error);
        }
    }

    console.log(doubts);

    const isLarge = useMediaQuery("(max-width: 767px)");

  return (
    <div className='w-[100%] h-[100vh] mt-[5rem] z-100 sedan-regular relative'>
        <div
                className='shadow-2xl'
                style={{
                    width: isLarge ? '100%' : '100%',
                    height: isLarge ? '80vh' : '80vh',
                    overflowY: 'scroll',
                    border: '2px solid black',
                    padding: '1rem'
                }}
            >
                <Box>
                    <Card className='mt-1'>
                        <CardHeader title={"All Doubts"} sx={{pt:2, alignItems: "center"}} />
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell align="middle">Id</TableCell>
                                    <TableCell align="middle">Name</TableCell>
                                    <TableCell align="middle">Email</TableCell>
                                    <TableCell align="middle">Paid</TableCell>
                                    <TableCell align="middle">Phone Number</TableCell>
                                    <TableCell align="middle">Status</TableCell>
                                    <TableCell align="middle">Topic</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {doubts.map((doubt) => (
                                    <TableRow
                                    key={doubt.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row">{doubt.id}</TableCell>
                                    <TableCell align="middle">{doubt.firstName}</TableCell>
                                    <TableCell align="middle">{doubt.mail}</TableCell>
                                    <TableCell style={{color: doubt.paid ? "green" : "red"}} align="middle">{doubt.paid ?  "Paid" : "Unpaid"}</TableCell>
                                    <TableCell align="middle">{doubt.phoneNumber}</TableCell>
                                    <TableCell align="middle">
                                        <Button style={{backgroundColor: doubt.status ? "green" : "red", color: "white"}} onClick={() => handleStatus(doubt.id)}>
                                            {doubt.status ? "Completed" : "Pending"}
                                        </Button>
                                    </TableCell>
                                    <TableCell style={{fontSize: "1.2rem"}} align="middle">{doubt.topic}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Box>
        </div>
    </div>
  )
}

export default Admin