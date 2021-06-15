import React from 'react'
import { useHistory } from "react-router-dom";
import "./Error.css";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
function Error() {
    let  history= useHistory();
    return (
        <>
            <div className="ErrorPage">
                <div className="head1">
                    <div className="animate__animated animate__shakeX head1">Error Page</div>
                    <div className="animate__animated animate__backInDown animate__delay-1s">-404-</div>
                </div>
                <div className="cont1">
                   Whoops! This page  deosn't exist
                </div>
                <div >
                    <button className="homeButton" onClick={history.goBack}><span><ArrowBackIcon/></span> Back to Previous Page</button>
                </div>
            </div>
        </>
    )
}

export default Error
