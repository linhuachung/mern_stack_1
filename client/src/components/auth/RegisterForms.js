import React from 'react'
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import {Link} from "react-router-dom";

function RegisterForm() {
    return <>
        <Form className='my-4'>
            <Form.Group>
                <Form.Control className='mb-3' type='text' placeholder="Username" name='username' required/>
            </Form.Group>
            <Form.Group>
                <Form.Control className='mb-3' type='password' placeholder="Password" name='password' required/>
            </Form.Group>
            <Form.Group>
                <Form.Control className='mb-3' type='password' placeholder="Confirm Password" name='confirmPassword' required/>
            </Form.Group>
            <Button variant='success' type='submit'>Register</Button>
        </Form>
        <p>Already have an account?
            <Link to='/login'>
                <Button variant='info' size='sm' className='ml-2'>Login</Button>
            </Link>
        </p>
    </>
}

export default RegisterForm
