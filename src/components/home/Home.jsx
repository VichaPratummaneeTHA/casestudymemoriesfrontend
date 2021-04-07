import React, {useEffect, useState} from 'react'
//Components
import Form from '../form/Form'
import Posts from '../posts/Posts'
//Redux
import {useDispatch} from 'react-redux'
import {getPosts} from '../../actions/indexActions'
// Material UI
import {Container, Grow, Grid} from '@material-ui/core'
// import {makeStyles} from '@material-ui/core/styles'

// const useStyles = makeStyles(() => ({

// }));

const Home = () => {

  // const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);
  
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch]);

  return (
    <Grow in>
        <Container>
          <Grid container justify='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts 
                setCurrentId={setCurrentId}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form
                currentId={currentId}
                setCurrentId={setCurrentId}
              />
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home
