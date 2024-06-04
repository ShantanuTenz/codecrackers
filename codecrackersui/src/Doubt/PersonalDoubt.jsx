import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Field, Form, Formik } from 'formik';
import { useMediaQuery } from '@uidotdev/usehooks';
import $ from 'jquery';
import logo from './Logo.jpeg';


export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues ={
  firstName: "",
  email: "",
  phoneNumber: "",
  topic: "",
  price: "",
}

const topicList = [
  {
    value: "array",
    label: "Array",
    price: 100
  },
  {
    value: "linkedList",
    label: "Linked Lists",
    price: 100
  },
  {
    value: "stack",
    label: "Stacks",
    price: 100
  },
  {
    value: "queue",
    label: "Queues",
    price: 150
  },
  {
    value: "tree",
    label: "Tree",
    price: 150
  },
  {
    value: "graphs",
    label: "Graphs",
    price: 200
  },
  {
    value: "hashTable",
    label: "Hash Tables",
    price: 150
  },
  {
    value: "heap",
    label: "Heaps",
    price: 150
  },
  {
    value: "searchAlgorithms",
    label: "Searching Algorithms",
    price: 100
  },
  {
    value: "sortingAlgorithms",
    label: "Sorting Algorthms",
    price: 100
  },
  {
    value: "dp",
    label: "Dynamic Programming",
    price: 200
  },
  {
    value: "string",
    label: "String",
    price: 100
  },
  {
    value: "recursion",
    label: "Recursion and Backtracking",
    price: 150
  }
]

const priceList = new Map(topicList.map(item => [item.value, item.price]));

const PersonalDoubt = () => {

  const [open, setOpen] = useState(false);
  const handleOpenEnrollModel = ()=>{setOpen(true)}
  const handleClose = () => setOpen(false);

  const updatePaymentOnServer = (formData, payment_id, order_id, status) => {
    const combineData = {
      doubtResponse: {
        firstName: formData.firstName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        topic: formData.topic,
        price: formData.price
      },
      payment_id: payment_id,
      order_id: order_id,
      status: status
    };

    $.ajax({
      url: 'http://localhost:8080/api/users/update_order',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      data: JSON.stringify(combineData),
      contentType: 'application/json',
      type: 'POST',
      dataType: 'json',
      success: () => console.log("Successfully updated"),
      error: error => console.log("Payment is successful, but we did not capture it on server right now, we will contact you or you can mail! ", error)
    });
  }

  const paymentStart = (values) => {
    const formData = {
      firstName: values.firstName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      topic: values.topic,
      price: priceList.get(values.topic)
    };

    $.ajax({
      url: 'http://localhost:8080/api/users/submit',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      data: JSON.stringify(formData),
      contentType: 'application/json',
      type: 'POST',
      dataType: 'json',
      success: (response) => {
        if (response.status === "created") {
          const options = {
            key: 'rzp_test_shhvY8NBvTIinr',
            amount: response.amount,
            currency: 'INR',
            name: 'CodeCrackers',
            description: 'CodeCrackers Payment',
            image: logo,
            order_id: response.id,
            handler: (response) => {
              updatePaymentOnServer(formData, response.razorpay_payment_id, response.razorpay_order_id, "paid");
              console.log("Payment Successful!");
            },
            prefill: {
              name: formData.firstName,
              email: formData.email,
              contact: formData.phoneNumber
            },
            notes: {
              address: "CodeCracker Platform"
            },
            theme: {
              color: "#3399cc"
            }
          };

          const rzp = new window.Razorpay(options);
          rzp.on('payment.failed', (response) => {
            console.log(response.error);
          });

          rzp.open();
        }
        handleClose();
      },
      error: (error) => console.log(error)
    });

  };


const isLarge = useMediaQuery("(max-width: 767px)");

  return (
    <>
    <div style={{
            marginTop: isLarge ? '0.8rem' : '5rem',
          }}  className='w-[100%] h-[80rem] mt-[5rem] z-10 sedan-regular'> 
      <div style={{
            padding: isLarge ? '1rem' : '2.5rem',
            flexDirection: isLarge ? 'column' : 'row',
            alignItems: isLarge? 'center' : '',
          }}  className='absolute w-[100%] h-[50rem] flex'>
        <div style={{
            width: isLarge ? '80%' : '40%',
          }}  className='text-center pt-20'>
          <p style={{
            fontSize: isLarge ? '4vh' : '2.25rem',
            lineHeight: isLarge ? '5vh' : '2.5rem',
          }} className='mb-5 text-[#195D56]'>Where Questions Find Answers</p>
          <p style={{
            fontSize: isLarge ? '0.8rem' : '2.25rem',
            lineHeight: isLarge ? '1rem' : '2.5rem',
          }} className='mb-5 text-[#195D56]'>Clearing Confusion, Instantly</p>
          <div style={{
            marginTop: isLarge ? '0.8rem' : '2.5rem',
          }}  className='flex justify-center w-full'>
            <button onClick={handleOpenEnrollModel} className='sedan-regular bg-[#195D56] hover:bg-[#1bdbc8] text-white text-lg px-10 py-2 rounded-sm'>
              Enroll Now
            </button>
          </div>
        </div>
        <div style={{
            width: isLarge ? '90%' : '60%',
            marginTop: isLarge ? '5vh' : '',
          }}  className='flex justify-center'>
          <div className='' style={{
            width: isLarge ? '100%' : '50%',
          }}>
            <div className='flex justify-center text-center'>
              <p style={{
                fontSize: isLarge? '4vh' : '1.875rem',
                lineHeight: isLarge? '5vh' : '2.25rem'
              }} className='mb-5 text-[#195D56]'>Feature of Out Doubt Solving Classes</p>
            </div>
            <Accordion className='mb-2'>
              <AccordionSummary 
                style={{ backgroundColor: '#195D56', color: 'white', fontSize: isLarge? '2vh' : '1.2rem' }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Student's Convenient
              </AccordionSummary>
              <AccordionDetails className='shadow-2xl text-[#195D56]'>
                No question is too small or too complex. Ask away and let's solve those doubts!
              </AccordionDetails>
            </Accordion>
            <Accordion className='mb-2'>
              <AccordionSummary 
                style={{ backgroundColor: '#195D56', color: 'white', fontSize: isLarge? '2vh' : '1.2rem' }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Personal Attention
              </AccordionSummary>
              <AccordionDetails className='shadow-2xl text-[#195D56]'>
                Code Crackers tailors doubt sessions and assigns dedicated mentors to match each student's unique learning pace, allowing them to ask questions freely without rushing.
              </AccordionDetails>
            </Accordion>
            <Accordion className='mb-2'>
              <AccordionSummary 
                style={{ backgroundColor: '#195D56', color: 'white', fontSize: isLarge? '2vh' : '1.2rem' }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Free Demonstration Session
              </AccordionSummary>
              <AccordionDetails className='shadow-2xl text-[#195D56]'>
                Students in Code Crackers doubt-solving program get a free demo session with mentors to encourage questions. We offer a money-back guarantee.
              </AccordionDetails>
            </Accordion>
            <Accordion className='mb-2'>
              <AccordionSummary 
                style={{ backgroundColor: '#195D56', color: 'white', fontSize: isLarge? '2vh' : '1.2rem' }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Immediate Doubt Resolution
              </AccordionSummary>
              <AccordionDetails className='shadow-2xl text-[#195D56]'>
                Code Crackers doubt-solving classes help students overcome academic hurdles by providing effective strategies for resolving doubts confidently.
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik initialValues={initialValues} 
          onSubmit={paymentStart}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field 
                        as={TextField}
                        name="firstName" 
                        label="First Name"
                        fullWidth
                        variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field 
                        as={TextField}
                        name="email" 
                        label="Email"
                        fullWidth
                        variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field 
                        as={TextField}
                        name="phoneNumber" 
                        label="Phone Number"
                        fullWidth
                        variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="topic-select" style={{ color: '#195D56' }}>
                      Topic
                    </InputLabel>
                    <Field 
                      as={Select}
                      name="topic" 
                      id="topic-field"
                      label="Topic"
                      fullWidth
                      variant="outlined"
                    >
                      {topicList.map((item) => (
                        <MenuItem key={item.price} value={item.value}>{item.label}</MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth variant='contained' type='submit' color='primary'>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  )
}

export default PersonalDoubt