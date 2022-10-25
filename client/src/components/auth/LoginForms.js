import React, {useContext, useState} from 'react'
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import {Link, useHistory} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";

function LoginForms() {

    const history = useHistory()


    //context
    const {loginUser} = useContext(AuthContext)

    //local state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password:''
    })

    const {username, password} = loginForm

    const onChangeLoginForm = event => setLoginForm({
        ...loginForm,
        [event.target.name]:event.target.value
    })

    const login = async even => {
        even.preventDefault()
        try{
            const loginData = await loginUser(loginForm)
            if(loginData.success){
                history.push('/dashboard')
            }else{

            }
        }catch (error) {
            console.log(error)
        }

    }

    return <>
        <Form className='my-4' onSubmit={login}>
            <Form.Group>
                <Form.Control className='mb-3' type='text' placeholder="Username" name='username' required value={username} onChange={onChangeLoginForm}/>
            </Form.Group>
            <Form.Group>
                <Form.Control className='mb-3' type='password' placeholder="Password" name='password' required value={password} onChange={onChangeLoginForm}/>
            </Form.Group>
            <Button variant='success' type='submit'>Login</Button>
        </Form>
        <p>Don't have an account?
            <Link to='/register'>
                <Button variant='info' size='sm' className='ml-2'>Register</Button>
            </Link>
        </p>
    </>
}

export default LoginForms
