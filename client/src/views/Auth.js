import React from 'react'
import LoginForms from "../components/auth/LoginForms";
import RegisterForms from "../components/auth/RegisterForms";

function Auth({authRoute}) {
    let body
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
