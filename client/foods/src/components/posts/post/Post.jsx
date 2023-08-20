import React from "react"
import useStyles from './styles'

import { Grid,Card,CardActions,CardContent,CardMedia,Button,Typography } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAlt'
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodRoundedIcon from '@mui/icons-material/FastfoodRounded';
import StarIcon  from '@material-ui/icons/Star'
import DeleteIcon from '@material-ui/icons/Delete'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { likePost, deletePost } from '../../../actions/posts';
import defImage from '../../../images/default.jpg'

const Post=({post, setCurrentId})=>{
    const dispatch = useDispatch();
    const classes=useStyles();
    const user=JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (post?.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };

    const handleLikePost=async()=>{
        dispatch(likePost(post._id))
    }

    const handleDeletePost=async()=>{
        dispatch(deletePost(post._id))
    }
    return(
       <Card className={classes.card} >
            <CardMedia className={classes.media} image={post.selectedFile || defImage} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2" className={classes.time}>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <div className={classes.overlay2}>
                 <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>edit</Button>
            </div>)}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div >
            <div className={classes.info}>
             <FastfoodRoundedIcon style={{ color: '#F18433',borderRadius:'50%',width:'20px',height:'20px'}}/>
             <Typography className={classes.title} gutterBottom variant="body1" component="h2" >{post.title}</Typography>
            </ div>
            <div className={classes.info}>
            <RestaurantIcon style={{ color: '#F18433',borderRadius:'50%',width:'20px',height:'20px'}}/>
            <Typography className={classes.canteen} >{post.canteen}</Typography>
            </ div>
            <CardContent className={classes.cardContents}>
                <Typography variant="body2" color="textSecondary" gutterBottom component="p" className={classes.desc}>{post.message}</Typography>
                <Grid container alignItems="center" className={classes.rating} >
                <Grid item>
                <StarIcon  style={{ color: '#F18433',borderRadius:'50%',width:'24px',height:'24px'}} />
                </Grid>
                <Grid item>
                <Typography variant="subtitle1" >{post.rating}</Typography>
                </Grid>
                </Grid>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLikePost}>
                 <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <Button size="small" color="primary" onClick={handleDeletePost}>
                    <DeleteIcon fontSize="small" /> 
                </Button>
                )}
            </CardActions>
       </Card>
    )
}

export default Post;