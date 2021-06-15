import React, { Component} from 'react'
import { Redirect } from 'react-router-dom';
import axios from '../Axios';
// import axios from '../helper/axios_init'

export default class ForgotPassword extends Component {
   
    state = {}
    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email : this.email,
        }
        console.log(data)
        axios.post('auth/forgot',data).then(
            res => {
                console.log("abcdl")
                console.log(res)
                // console.log("iuoiu")
                this.setState({
                    otpSent : true
                });
                console.log(this.state.otpSent)
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }

    render() {

        if(this.state.otpSent) 
        {
            console.log("dssf")

            return <Redirect to={'/resetPassword'}/>
        }

        return (
            <form  onSubmit = {this.handleSubmit}>
                <h3> enter email here</h3>
                <div className = "form-group">
                    <label>email</label>
                    <input type="email" className="form-control"  placeholder="email"
                            onChange={e => this.email = e.target.value}/>
                </div>
                <button className="btn btn-primary btn-block">
                    send Otp
                </button>
            </form>
        )
    }
}