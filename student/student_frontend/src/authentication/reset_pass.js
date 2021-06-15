import axios from '../Axios';
import React ,{useRef,useState} from 'react'
import { Redirect } from 'react-router-dom';
import {useForm} from 'react-hook-form'

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
        
        axios.post('student/forgot',{
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
        axios.post('student/resetPassword',reqData).then(
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
            <form  onSubmit = {resetPassword}>
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
            </form>
            </>
        )
    } else {
        return (
            <>
                <form  onSubmit = {otpSendToEmail}>
                    <h3> enter email here</h3>
                    <div className = "form-group">
                        <label>email</label>
                        <input type="email" className="form-control"  placeholder="email"
                                name = "email"
                                onChange={handleInput}/>
                    </div>
                    <button className="btn btn-primary btn-block">
                        send Otp
                    </button>
                </form> 
            </>
        )
    }
    
}

export default ResetPass
