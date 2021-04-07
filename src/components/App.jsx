import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
//Components
import Navbar from '../components/navBar/Navbar'
import Home from '../components/home/Home'
import Auth from '../components/auth/Auth'
// Material UI
import {Container} from '@material-ui/core'
// import {makeStyles} from '@material-ui/core/styles';

// const useStyles = makeStyles(() => ({

// }));

const App = () => {

  return (
    <BrowserRouter>
      <Container maxWidth='lg'>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home}/>  
          <Route path='/auth' exact component={Auth}/>  
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
