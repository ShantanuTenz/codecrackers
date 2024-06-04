import { Button, Grid, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../State/Authentication/Action';
import { useState } from 'react';

const initialValues = {
  fullName: "",
  email: "",
  password: ""
};

const RegisterForm = () => {
  const [passwordError, setPasswordError] = useState("");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    if (!passwordError) {
      dispatch(registerUser({ userData: values, navigate }));
    }
    setSubmitting(false);
  };

  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Password is required";
    } else if (value.length < 8) {
      error = "Password must be at least 8 characters long";
    }
    setPasswordError(error);
    return error;
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
            Register
          </Typography>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <Field
                  as={TextField}
                  name="fullName"
                  label="Full Name"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  autoComplete="name"
                  sx={{ marginBottom: 2 }}
                />
                <Field
                  as={TextField}
                  name="email"
                  type="email"
                  label="Email"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  autoComplete="email"
                  sx={{ marginBottom: 2 }}
                />
                <Field
                  as={TextField}
                  name="password"
                  type="password"
                  label="Password"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  autoComplete="new-password"
                  sx={{ marginBottom: 2 }}
                  validate={validatePassword}
                  helperText={passwordError}
                  error={!!passwordError}
                />
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={isSubmitting}
                  sx={{ marginBottom: 2 }}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              </Form>
            )}
          </Formik>
          <Typography variant='body2' align='center' sx={{ marginBottom: 2 }}>
            Already have an account?
          </Typography>
          <Button
            className='text-black'
            variant="text"
            size="small"
            sx={{ color: "black", backgroundColor: "white" }}
            onClick={() => navigate("/account/login")}
          >
            Login
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
