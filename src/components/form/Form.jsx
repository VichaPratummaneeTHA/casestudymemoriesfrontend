import React, {useState, useEffect} from 'react'

// Material UI
import {makeStyles} from '@material-ui/core/styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
//Redux
import {useDispatch, useSelector} from 'react-redux'
import {createPost, updatePost} from '../../actions/indexActions'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));

const Form = ({
  currentId, setCurrentId
}) => {

  const dispatch = useDispatch();
  const post = useSelector( s => (currentId ? s.posts.find(p => p._id === currentId) : null));
  const [postData, setPostData] = useState({
    // creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  })
  const user = JSON.parse(localStorage.getItem('profile'))
 
  useEffect(() => {
    if(post){
      setPostData(post)
    }
  }, [post]);

  const handleOnChange = e => {
    const {name, value} = e.target;
    setPostData({
      ...postData,
      [name]: value
    })
  }

  const handleSelectFile = e => {
    const value = e.base64
    
    setPostData({
      ...postData,
      selectedFile: value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault();
    
    if(currentId === 0){
      dispatch(createPost({
        ...postData,
        name: user?.result?.name
      }))
    }else{
      dispatch(updatePost(currentId, {
        ...postData,
        name: user?.result?.name
      }))
    }
    handleClear()
  }

  const handleClear = () => {
    setPostData({
      // creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    })
    setCurrentId(null)
  }

  const classes = useStyles()

  if(!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please Sign-In to create your own memories and like other's meomories ...
        </Typography>
      </Paper>
    )
  }
  return (
    <Paper className={classes.paper}>
      <form 
        autoComplete='off' 
        noValidate 
        className={`${classes.root} ${classes.form}`}
        onSubmit={e => handleSubmit(e)}
        >
      <Typography
        variant='h6'
      >{currentId ? ('Editing') : ('Creating')} a Memory
      </Typography>
      {/* <TextField
        name='creator'
        label="Creator" 
        type="text"
        variant='outlined'
        fullWidth
        value={postData.creator || ''}
        onChange={handleOnChange}
        /> */}
      <TextField
        name='title'
        label="Title" 
        type="text"
        variant='outlined'
        fullWidth
        value={postData.title || ''}
        onChange={handleOnChange}
        />
      <TextField
        name='message'
        label="Message" 
        type="text"
        variant='outlined'
        fullWidth
        value={postData.message || ''}
        onChange={handleOnChange}
        />
      <TextField
        name='tags'
        label="tags" 
        type="text"
        variant='outlined'
        fullWidth
        value={postData.tags || ''}
        onChange={e => setPostData({
          ...postData,
          tags: e.target.value.split(',')
        })}
        />
      <div className={classes.fileInput}>
        <FileBase
          type='file'
          multiple={false}
          onDone={
            e => handleSelectFile(e)
          }
        />
      </div>

      <Button
        className={classes.buttonSubmit}
        variant='contained'
        color='primary'
        size='large'
        type='submit'
        fullWidth
      >SUBMIT</Button>
      <Button
        className={classes.buttonSubmit}
        variant='contained'
        color='secondary'
        size='large'
        fullWidth
        onClick={handleClear}
      >CLEAR</Button>
      
      </form>
    </Paper>
  )
}

export default Form
