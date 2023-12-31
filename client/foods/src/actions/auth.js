import { AUTH } from '../constants/actionTypes'

import * as api from '../api/index.js'


export const signin=(formData,navigateTo)=>async(dispatch)=>{
  try{
       const {data}=await api.signIn(formData);

       dispatch({type: AUTH,data})
       navigateTo('/');
  }
  catch(error){
     console.log(error)
  }
}

export const signup=(formData,navigateTo) => async (dispatch)=>{
    try{
      const {data} = await api.signUp(formData);
      dispatch({type: AUTH,data})
        navigateTo('/') 
    }
    catch(error){
        console.log(error)
    }
  }