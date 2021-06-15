import React, { Component } from 'react'
import { Redirect , Link } from 'react-router-dom';
import axios from '../Axios';
import {TextField} from '@material-ui/core';
import './login.css'; 
// import Cookies from 'universal-cookie';

export default class Login extends Component {

    state = {}
    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email : this.email,
            password : this.password,
            // confirmPassword : this.confirmPassword
        }
        console.log(data)
        axios.post('auth/login',data).then(
            res => {
                console.log("hey");
                // const cookies = new Cookies();
                // cookies.set('jwt',res.data.token)
                console.log(res)
                // console.log(res.data.token)
                localStorage.setItem('token',res.data.accessToken)
                this.setState({
                    loggedIn : true
                });
                this.props.setuser(res.data.user)
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }

    render() {

        if(this.state.loggedIn ) return <Redirect to={'/dashBoard'} />
        

        return (
            <form className="container" >
                <div className="title">Sign in</div>
                <div className="form-group">
                <TextField type="email" id="standard-basic" label="Email" required onChange={e => this.email = e.target.value}/>
                </div>
                <div className="form-group">
                <TextField type="password" id="standard-basic" label="Password" required onChange={e => this.password = e.target.value}/>
                </div>
                <div className="form-group">
                <button  className="button" onSubmit = {this.handleSubmit}>
                Login
                </button>
                </div>
                <div className="form-group">
                <Link exact  to={'/resetPassword'} className="link" >Forgot password?</Link>
                </div>
                <div className="form-group">
               Dont have an account?<span> <Link exact  to={'/register'} className="link" >Create an account</Link> </span>
                </div>
                
            </form>
        )
    }
}