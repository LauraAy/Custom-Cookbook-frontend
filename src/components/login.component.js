import React, { useState, useRef, Fragment } from "react";
import { useNavigate } from "react-router-dom"
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Paper, Box, Grid, Button, FillledInput, OutlinedInput, InputLabel, InputAdornment, 
IconButton, FormHelperText, FormControl, FormControlLabel, Checkbox, TextField, Typography} from '@mui/material';
import { Visibility, VisibilityOff,} from '@mui/icons-material';
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import { Center } from "@chakra-ui/react";


const LoginComponent = () => {

  let navigate = useNavigate();

  //validation functions
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required'),
    password: Yup.string()
      .required('Password is required')
    });
  
    const {
      register,
      control,
      handleSubmit,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(validationSchema)
    });

    //password field show/hide functions
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };



  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (data) => {
    const username=data.username
    const password = data.password
   
    AuthService.login(username, password).then(
        () => {
          navigate("/");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
  };

  return (
    <Fragment>
      <Paper>
        <Typography variant="h6" align="center" margin="dense">
          Login to Start Cooking!
        </Typography>
          <Box sx={{ml:15, mr:15 }}>
            <FormControl fullWidth >
              <TextField
                required
                id="username"
                name="username"
                label="Username"
                fullWidth
                margin="dense"
                {...register('username')}
                  error={errors.username ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.username?.message}
              </Typography>
            </FormControl>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              {...register('password')}
                error={errors.password ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.password?.message}
            </Typography>
          </FormControl>
          <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(handleLogin)}
          >
            Login
          </Button>
        </Box>
        </Box>
      </Paper>
    </Fragment>
  )
};

export default LoginComponent;