import axios from '../Axios';
import React ,{useRef,useState} from 'react'
import { Redirect } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import {TextField} from '@material-ui/core';
import './reset_pass.css'; 
function ResetPass() {
    const { register, errors, watch } = useForm({});
    const newPassword = useRef({})
    newPassword.current = watch("newPassword")
    const [otpSent, setotpSent] = useState(false)
    const [data, setdata] = useState({
        email : "",
        otp : "",
        newPassword: ""
    })
    const [passChanged, setPassChanged] = useState(false)
    const handleInput=(event)=>{
        const {value,name} = event.target;
            setdata((prevValue)=>{
                return{
                    ...prevValue,
                    [name]: value,
                }
            });
        }
    const otpSendToEmail = (e) => {
        e.preventDefault();
        
        axios.post('auth/forgot',{
            email : data.email
        }).then(
            res => {
                console.log(data.email)
                setotpSent(true);
            }
        ).catch(
            err => {
                console.log(err)
            }
        )

    }

    const resetPassword = (e) => {
        e.preventDefault();
        // console.log(data)
        const reqData = {
            email: data.email,
            otp : data.otp,
            newPassword : data.newPassword

        }
        // console.log(reqData)
        axios.post('auth/resetPassword',reqData).then(
            res => {
                console.log(res)
                setPassChanged(true)
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }
    if(passChanged) return <Redirect to={'/'} />
    if (otpSent) {
        return (
            <>
            {/* <form  onSubmit = {resetPassword}>
                <h3> reset password  here</h3>
                <div className = "form-group">
                    <label>otp</label>
                    <input type="number" className="form-control"  placeholder="otp"
                            onChange={handleInput}
                            name="otp"
                            ref = {register ({
                                required: "You must specify a otp",
                                minLength: {
                                value: 4,
                                message: "OTP must have at least 4 characters"
                                }
                            })}
                            />
                </div>
                
                <div className = "form-group">
                    <label>new password</label>
                    <input type="password" className="form-control"  placeholder="password"
                            onChange={handleInput} 
                            name="newPassword"
                            ref = {register ({
                                required: "You must specify a password",
                                minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                                }
                            })}
                            />
                    {errors.newPassword && <p>{errors.newPassword.message}</p>}
                </div>
                <div className = "form-group">
                    <label>confirm  password</label>
                    <input type="password" className="form-control"  placeholder="confirm password" 
                            name="c_password"
                            ref={register({
                                validate: value =>
                                  value === newPassword.current || "The passwords do not match"
                              })}
                            />
                    {errors.newPassword && <p>{errors.newPassword.message}</p>}
                </div>
                <button className="btn btn-primary btn-block">
                    reset
                </button>
            </form> */}
            <form className="container" onSubmit={resetPassword}>
                    <div className="title">OTP Send</div>
                    <div className="form-group">
                    <TextField type="number" id="standard-basic"  label="OTP"  required  onChange={handleInput} 
                            name="newPassword"
                            ref = {register ({
                                required: "You must specify a password",
                                minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                                }
                            })}/>
                    </div>
                    <div className="form-group">
                    <TextField type="password" id="standard-basic" label="Password"  required  onChange={handleInput} 
                            name="newPassword"
                            ref = {register ({
                                required: "You must specify a password",
                                minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                                }
                            })}/>
                    </div>
                    <div className="form-group">
                    <TextField type="password" id="standard-basic" label="Confirm Password" required  name="c_password"
                            ref={register({
                                validate: value =>
                                  value === newPassword.current || "The passwords do not match"
                              })}/>
                    </div>
                    <div className="form-group">
                        <button  className="button">
                        Send OTP
                        </button>
                    </div>
            
                </form> 
            </>
        )
    } else {
        return (
            <>
                
                <form className="container" onSubmit={otpSendToEmail}>
                    <div className="title">Reset</div>
                    <div className="form-group">
                    <TextField type="email" id="standard-basic"  label="Email" name="email" required onChange={handleInput}/>
                    <div className="form-group">
                        <button  className="button">
                        Send OTP
                        </button>
                    </div>
                    </div>
                </form> 
            </>
        )
    }
    
}

export default ResetPass
