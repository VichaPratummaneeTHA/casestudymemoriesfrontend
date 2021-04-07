import React, {Fragment, useState} from 'react'
import {useHistory} from 'react-router-dom'
// Components
import Input from '../reUseComponents/Input'
import Icon from '../auth/Icon'
// Material UI
import {Paper, Typography, Avatar, Button, Grid, Container} from '@material-ui/core'
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import {makeStyles} from '@material-ui/core/styles';
//Google Login
import {GoogleLogin} from 'react-google-login'
//Redux
import {useDispatch} from 'react-redux'
import {signUp, signIn} from '../../actions/auth' 

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
}));

const googleId = '783892457569-fnks44ka4k3s2osmekq74gc0m6nqdr84.apps.googleusercontent.com'
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState(initialState)
  const [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
 
  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(isSignUp){
      dispatch(signUp(formData, history))
    }else{
      dispatch(signIn(formData, history))
    }
    
  }

  const handleSnowPassword = () => {
    setShowPassword(prevSnowPassword => !prevSnowPassword)
  }

  const switchMode = () => {
    setIsSignUp(previsSignUp => !previsSignUp)
    handleSnowPassword(false)
  }

  const googleSuccess = async res => {
    console.log(res)
    const result = res?.profileObj
    const token = res?.tokenId

    try {
      dispatch({
        type: 'AUTH',
        data:{
          result, token
        }
      });

      history.push('/')
    } catch (err) {
      console.log(err)    
    }
  }
  const googleFailure = (err) => {
    console.log(err)
    console.log('Google Sign-In was unsuccessfuj. Please Try do it again later ..')
  }
  
  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOpenOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignUp ? ('Sign-Up') : ('Sign-In')}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignUp && (
                 <Fragment>
                  <Input 
                    name = 'firstName'
                    label = 'First Name'
                    handleChange = {handleChange}
                    type = 'text'
                    half
                  />
                  <Input 
                    name = 'lastName'
                    label = 'Last Name'
                    handleChange = {handleChange}
                    type = 'text'
                    half
                  />
                 </Fragment> 
              )}
                  <Input 
                    name = 'email'
                    label = 'Email Address'
                    handleChange = {handleChange}
                    type = 'email'
                  />
                  <Input 
                    name = 'password'
                    label = 'Password'
                    handleChange = {handleChange}
                    handleSnowPassword = {handleSnowPassword}
                    type = {showPassword ? ('text') : ('password')}
                  />
              {
                isSignUp && (
                  <Input
                    name = 'confirmPassword'
                    label = 'Repeat Password'
                    handleChange = {handleChange}
                    type= 'password'
                  />
                )
              }
              </Grid>
              <Button
                className = {classes.submit} 
                type = 'submit'
                fullWidth
                variant = 'contained'
                color = 'primary'
              >{isSignUp ? ('Sign-Up') : ('Sign-In')}</Button>

              <GoogleLogin
                clientId = {googleId}
                render = {
                  (renderProps) => (
                    <Button
                      className={classes.googleButton}
                      color='primary'
                      fullWidth
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      startIcon={<Icon />}
                      variant='contained'
                    >Google Sign-In</Button>
                  )}
                onSuccess={googleSuccess} 
                onFailure={googleFailure}
                cookiePolicy='single_host_origin'
              />
              <Grid container justify='flex-end'>
                  <Grid item>
                    <Button onClick={switchMode}>
                      {isSignUp ? ('Already have an account? Sign In') : ('Do not have account? Sign Up')}
                    </Button>
                  </Grid>
              </Grid>
         
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
