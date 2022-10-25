import React, {useContext} from 'react'
import LoginForms from "../components/auth/LoginForms";
import RegisterForms from "../components/auth/RegisterForms";
import {AuthContext} from "../contexts/AuthContext";
import {Spinner} from "react-bootstrap";
import {Redirect} from "react-router-dom";

function Auth({authRoute}) {
    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)
    let body
    if(authLoading)
        body = (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation='border' variant='info'/>
            </div>
        )
    else if(isAuthenticated) return <Redirect to='/dashboard'/>
    else
    body = (
        <>
            LearnIt
            {authRoute === 'login' && <LoginForms/> }
            {authRoute === 'register' && <RegisterForms/> }

        </>

    )
    return (
        <div className='landing'>
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>LearnIt</h1>
                    <h4>Keep track of what you are learning</h4>
                    {body}
                </div>
            </div>
        </div>
    )
}

export default Auth
