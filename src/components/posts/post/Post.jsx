import React, {Fragment} from 'react'
import moment from 'moment';
//Redex
import {
  useDispatch
} from 'react-redux'
import {deletePost, likePost} from '../../../actions/indexActions'
// Material UI
import {makeStyles} from '@material-ui/core/styles'
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
});


const Post = ({
  post, setCurrentId
}) => {
  
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch();

  
  const handleMoreHorizonBtn = (currentId) => {
    setCurrentId(currentId)
    console.log(post)
  }

  const handleLikeBtn = (id) => {
    dispatch(likePost(id));
   }

  const handleDeleteBtn = (id) => {
    dispatch(deletePost(id));
  }


  const Likes = () => {

    if(post?.likes?.length > 0){
 
     return post.likes.find(like => like === (user?.result?.googleId || user?.result?._id))
     ? (
       <Fragment>
         <ThumbUpAltIcon
           fontSize='small'
         />&nbsp;{post.likes.length > 2 ? (`You and ${post.likes.length -1} others`) : (`${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`)}
       </Fragment>
     )
     : (
       <Fragment>
          <ThumbUpAltIcon
           fontSize='small'
           />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
       </Fragment>
     )
    }
 
    return <Fragment>
     <ThumbUpAltIcon 
       fontSize='small'    
     />&nbsp; Like
    </Fragment>
  }
 
  return (
    <Card className={classes.card}>
     <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title}/>
     <div className={classes.overlay}>
       <Typography variant='h6'>{post.name}</Typography>
       <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
     </div>
     {
       (
        user?.result?.googleId === post?.creator || user?.result?._id === post?.creator
       ) && (
        <div className={classes.overlay2}>
          <Button 
            style={{color: 'white'}} 
            size='small' 
            onClick={() => handleMoreHorizonBtn(post._id)}>
              <MoreHorizIcon fontSize='default'/>
          </Button>
        </div>
       )
     }
     
     <div className={classes.details}>
      <Typography variant='body2' color='textSecondary' component='h2'>
        {post.tags ? post.tags.map(tag => `#${tag} `) : null}
      </Typography>
     </div>

     <Typography className={classes.title} gutterBottom variant='h5' component='h2'>
        {post.title}
     </Typography>

     <CardContent>
      <Typography variant='body2' color='textSecondary' component='p'>
        {post.message}
      </Typography>
     </CardContent>

     <CardActions className={classes.cardActions}>
      <Button 
        size='small' 
        color='primary' 
        disabled={!user?.result}
        onClick={() => {handleLikeBtn(post._id)}}>
        <Likes />
      </Button>

    {
      (
        user?.result?.googleId === post?.creator || user?.result?._id === post?.creator
      ) && (
        <Button 
        size='small' 
        color='primary'
        disabled={!user?.result} 
        onClick={() => {
          handleDeleteBtn(post._id)
      }}>
        <DeleteIcon fontSize='small'/> Delete
      </Button>
      )
    }
      
     </CardActions>
    </Card>
  )
} 

export default Post
