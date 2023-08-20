import React,{useState,useEffect} from "react"
import { Rating } from '@material-ui/lab';
import { Grid,TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles'
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import {createPost} from '../../actions/posts'
import {updatePost} from '../../actions/posts'

const Form=({currentId, setCurrentId})=>{ 
    
    const [postData, setPostData] = useState({ title: '',canteen: '', message: '', tags: '', selectedFile: '',rating:0 });
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const dispatch= useDispatch();
    const classes=useStyles();
    const user=JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
      if (post) setPostData(post);
    }, [post]);

    const clear = () => {
        setCurrentId(0);
        setPostData({ title: '',canteen: '', message: '', tags: '', selectedFile: '',rating: 0});
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (currentId === 0) {
        dispatch(createPost({...postData,name: user?.result?.name}));
        clear();
      } else {
        console.log("fetching",user.result.name);
        dispatch(updatePost(currentId, {...postData,name: user?.result?.name}));
        console.log("create",postData)
        clear();
      }
    };

    if (!user?.result?.name) {
      return (
        <Paper className={classes.paper}>
          <Typography variant="h6" align="center">
            Please Sign In to post your favourite food review and like other's review.
          </Typography>
        </Paper>
      );
    }
  
    return(
        <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Add a Food'}</Typography>
          <TextField name="title" variant="outlined" label="Food" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
          <TextField name="canteen" variant="outlined" label="Canteen" fullWidth value={postData.canteen} onChange={(e) => setPostData({ ...postData, canteen: e.target.value })} />
          <TextField name="message" variant="outlined" label="Comments" fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
          <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
          <Grid container className={classes.review} alignItems="center" spacing={1}>
          <Grid item>
               <Typography variant="subtitle1">Review:</Typography>
          </Grid>
          <Grid item>
               <Rating name="rating" value={parseFloat(postData.rating)} onChange={(e) => setPostData({ ...postData, rating: e.target.value })} precision={0.5} size={"large"} />
          </Grid>
          </Grid>
          <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
      </Paper>
    )
}

export default Form;