import { Button, Grid, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const initialValues = {
  otp:""
};

const Verify = () => {
  const navigate = useNavigate();

  const {auth} = useSelector(store => store);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const email = auth.user?.email; 
      const response = await axios.post('http://localhost:8080/auth/verify', null, { params: { email, otp: values.otp } });
      
      if (response.status === 200) {
        navigate('/doubt');
      }
    } catch (error) {
      alert(`Verification failed: ${error.response.data}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid className='absolute text-center z-40' item xs={10} sm={6} md={4}>
        <div className='pl-[2rem] pr-[2rem] pt-[1rem] pb-[1rem]' style={{ borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
          <Typography variant='h5' align='center' gutterBottom>
          OTP Verification
          </Typography>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <Field
                  as={TextField}
                  name="otp"
                  label="Enter verification code"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  autoComplete="name"
                  sx={{ marginBottom: 2 }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={isSubmitting}
                  sx={{ marginBottom: 2 }}
                >
                  {isSubmitting ? "Verifying..." : "Verify"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
};

export default Verify;
