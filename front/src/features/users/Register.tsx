import {type ChangeEvent, type SubmitEvent, useState} from "react";
import type {RegisterMutation} from "../../interfaces.ts";
import {Avatar, Box, Button, TextField, Typography, Link} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectRegisterError, selectRegisterLoading} from "./usersSlice.ts";
import {register} from "./usersThunks.ts";

const Register = () => {
  const dispatch = useAppDispatch();
  const registerLoading = useAppSelector(selectRegisterLoading);
  const registerError = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const [state, setState] = useState<RegisterMutation>({
    username: '',
    password: '',
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState(prevState => ({...prevState, [name]: value}));
  };

  const onSubmitHandler = async (e: SubmitEvent) => {
    e.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      navigate('/');
    } catch (e) {
      console.log('Error!', e);
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return registerError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
      <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main'}}>
          <LockIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmitHandler}
          sx={{mt: 3, display: 'flex', flexDirection: 'column', maxWidth: '400px', width: '100%', gap: 3}}
          noValidate
        >
          <TextField
            required
            label="Username"
            name="username"
            value={state.username}
            onChange={onChangeHandler}
            error={Boolean(getFieldError('username'))}
            helperText={getFieldError('username')}
          />
          <TextField
            required
            name="password"
            label="Password"
            type="password"
            value={state.password}
            onChange={onChangeHandler}
            error={Boolean(getFieldError('password'))}
            helperText={getFieldError('password')}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{mb: 3}}
            loading={registerLoading}
          >
            Sign Up
          </Button>
        </Box>
        <Link component={RouterLink} to='/login'>
          Already have an account? Sign in
        </Link>
      </Box>
    )
};

export default Register;