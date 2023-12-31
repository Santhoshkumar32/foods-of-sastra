import React from "react"
import { useSelector } from "react-redux";
import Post from './post/Post';
import useStyles from './styles'

import { CircularProgress,Grid } from "@material-ui/core";

const Posts=({ setCurrentId })=>{
    const posts= useSelector((state)=> state.posts)
    const classes=useStyles();
    console.log(posts);
    return(
       !posts.length? <CircularProgress/>: (
        <Grid container className={classes.container} alignItems="stretch" spacing={3}>
            {  
                posts.map((post)=>(
                <Grid item key={post._id} xs={12} sm={6} md={6}>
                    <Post post={post} setCurrentId={setCurrentId}/>
                </Grid>
            ))
            }
        </Grid>
       )
    )
}

export default Posts;