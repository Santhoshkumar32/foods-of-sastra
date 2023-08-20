import React from "react"
import {Container} from '@material-ui/core';
import Auth from "./components/auth/Auth";
import Home from './components/home/Home';
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter,Routes,Route } from "react-router-dom";

const NotFoundPage = () => {
  return <h1>404 Page Not Found</h1>;
};

const App=()=>{
    
    return(
       <BrowserRouter>
       <Container maxwidth="lg">
        <Navbar />
       <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="*" element={NotFoundPage} />
        </Routes>        
      </Container>
       </BrowserRouter>
    )
}
export default App;
