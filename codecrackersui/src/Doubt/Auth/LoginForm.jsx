import { Button, Grid, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../State/Authentication/Action';

const initialValues = {
  email: "",
  password: ""
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    // console.log(values);
    dispatch(loginUser({ userData: values, navigate }));
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid className='absolute text-center' item xs={10} sm={6} md={4}>
        <div className='pl-[2rem] pr-[2rem] pt-[1rem] pb-[1rem]' style={{ borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
          <Typography variant='h5' align='center' gutterBottom>
            Login
          </Typography>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <Field
                as={TextField}
                name="email"
                label="Email"
                fullWidth
                variant="outlined"
                margin="normal"
                sx={{ marginBottom: 5 }}
              />
              <Field
                as={TextField}
                type="password"
                name="password"
                label="Password"
                fullWidth
                variant="outlined"
                margin="normal"
                sx={{ marginBottom: 5 }}
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                sx={{ marginBottom: 5 }}
              >
                Login
              </Button>
            </Form>
          </Formik>
          <Typography variant='body2' align='center'>
            Don't have an account?
          </Typography>
          <Button
            sx={{color: "black", backgroundColor: "white"}}
            variant="text"
            size="small"
            onClick={() => navigate("/account/register")}
          >
            Register
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
