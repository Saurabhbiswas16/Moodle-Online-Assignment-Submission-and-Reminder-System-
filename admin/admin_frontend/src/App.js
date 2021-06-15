import React,{useState,useEffect} from 'react'
import './App.css';
import {Switch,Route,Redirect} from 'react-router-dom'



import Login from './admin/adminAuth'
// import AdminPanel from './admin/adminPanel';
import AllRequest from './request/AllRequest'
import UpdateBatch from './newBatch/NewBatch';
import CreateNew from './createDepartment/CreateNew';
import Navbar from './navbar/Navbar'
function App() {
  
  return (
    <>
    <Navbar />
    <Switch>
      <>
        <Route exact path="/adminPanel" component = {AllRequest} />
        <Route exact path="/updateBatch" component = {UpdateBatch} />
        <Route exact path="/createDepartment" component = {CreateNew} />
        <Route exact path="/" component={Login}/>
      </>
      
      
    </Switch>
    </>
    
  );
}

export default App;
