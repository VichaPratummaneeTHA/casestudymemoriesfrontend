import React, {useState, useEffect} from 'react'
import {Link, useLocation, useHistory} from 'react-router-dom'
import decode from 'jwt-decode'
//images
import memories from '../../images/memories.png'
// Material UI
import {AppBar, Typography, Toolbar, Avatar, Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import {deepPurple} from '@material-ui/core/colors';
//Redux
import {useDispatch} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  heading: {
    color: '#54ccc2', //rgba(0,183,255, 1)
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  [theme.breakpoints.down('sm')]:{
    appBar:{
      visibility: 'hidden',
      margin: '-30px 0',
    },
    mainContainer: {
      flexDirection: 'column-reverse',
    },
    innerContainer: {
      margin : '16px 0 24px 0',
      minHeight: '600px'
    }
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  // const user = null;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  console.log(user)

  const handleLogout = () => {

    dispatch({
      type: 'LOGOUT'
    });
    history.push('/')
    setUser(null)
  }

  useEffect(() => {
    //Check Token expeired
    const token = user?.token
    
    if(token){
      const decodeToken = decode(token);

      if(decodeToken.exp * 1000 < new Date().getTime()){
        return handleLogout()
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
    // eslint-disable-next-line
  }, [location]);

  return (
  <AppBar className={classes.appBar} position='static' color='inherit'>
    <div className={classes.brandContainer}>
      <Typography component={Link} to ='/' className={classes.heading} variant='h3' align='center'>
        Post Memories App
      </Typography>
      <img className={classes.image} src={memories} alt="icon" height='60'/>
    </div>
    <Toolbar className={classes.toolbar}>
      {
        user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
            <Button 
              variant='contained' 
              color='secondary'
              onClick={handleLogout}
              >Log-Out</Button>
          </div>
        ) : (
          <Button component={Link} to='/auth' variant='contained' color='primary'>Sign-In</Button>
        )
      }
    </Toolbar>
  </AppBar>
  )
}

export default Navbar
