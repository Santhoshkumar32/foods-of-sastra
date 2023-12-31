import React, {useState,useEffect} from 'react'
import Posts from '../posts/Posts'
import Form from '../forms/Form'
import {getPosts}  from "../../actions/posts"
import { useDispatch } from 'react-redux';
import {Container,Grow,Grid} from '@material-ui/core';



const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch=useDispatch();

    useEffect(()=>{
          dispatch(getPosts());
    },[currentId,dispatch]);

  return (
     <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
         </Container>
       </Grow>
  )
}

export default Home;
