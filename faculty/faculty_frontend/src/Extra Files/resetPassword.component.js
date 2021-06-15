import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import axios from '../Axios';
// import Cookies from 'universal-cookie';

export default class ResetPassword extends Component {

    state = {}
    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            otp : this.otp,
            newPassword : this.newPassword,
        }
        console.log(data)
        axios.post('auth/resetPassword',data).then(
            res => {
                console.log(res)
                this.setState({
                    changed : true
                });
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }

    render() {

        if(this.state.changed ) return <Redirect to={'/login'} />
        

        return (
            <form  onSubmit = {this.handleSubmit}>
                <h3> reset password  here</h3>
                <div className = "form-group">
                    <label>otp</label>
                    <input type="number" className="form-control"  placeholder="email"
                            onChange={e => this.otp = e.target.value}/>
                </div>
                <div className = "form-group">
                    <label>new password</label>
                    <input type="password" className="form-control"  placeholder="password"
                            onChange={e => this.newPassword = e.target.value}/>
                </div>
                <button className="btn btn-primary btn-block">
                    reset
                </button>
            </form>
        )
    }
}