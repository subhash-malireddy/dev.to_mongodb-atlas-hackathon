import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom';


import * as Realm from "realm-web";

import '../../styles/home.scss'

function Home() {

    const app = new Realm.App({id: process.env.REACT_APP_REALM_APP_ID})

    const [windowHeight, setWindowHeight] = useState(window.innerHeight)
    const [formType, setFormType] = useState('signin')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let navigate = useNavigate()


    const styles = {
        homeSection: {
            display: "grid",
            justifyContent: "center",
            alignContent: "center",
            minHeight: `${windowHeight}px`
        }
    }
    const toggleFormType = (e) => {
        if(formType === 'signin'){
            setFormType('signup')
            setEmail('')
            setPassword('')
    }
        else{
            setFormType('signin')    
        }
    }

    const handleSignupSignin = async () =>{
        if(formType === 'signin'){
            console.log('signing in')
            console.log(`email: ${email}, password: ${password}`)
            const credentials = Realm.Credentials.emailPassword(email, password)
            try{
                const user = await app.logIn(credentials);
                console.log(user)
                navigate('/tasks')
            }catch(e){
                alert(String(e))
            }
        }else{
            console.log('signing up')
            console.log(`email: ${email}, password: ${password}`)
            const userRegisterResult = await app.emailPasswordAuth.registerUser({ email, password });
            console.log(userRegisterResult)
        }
    }

    const emailValidation = () => {
        if (
            /\S+@\S+\.\S+/.test(
            email,
          )
        ) {
          return true;
        }
        else if (email.trim() === '') {
           return false;
        }
        else{
            return false;
        }
        
      };

      const passwordValidation = () => {
          if (password.length >= 8){
              return true;
          }
          else if (password.length === 0){
              return false;
          }
          else{
              return false;
          }
      };


    useEffect(() => {
        setWindowHeight(window.innerHeight)
        window.addEventListener('resize', () => {
            setWindowHeight(window.innerHeight)
        })

        return () => {
            window.removeEventListener('resize', setWindowHeight)
        }
    }, [])

    return (
        <div style={styles.homeSection}>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                    {
                        formType === 'signup' && 
                        <Form.Text className="text-muted">
                        Password should be atleast 8 characters long!
                        </Form.Text>
                    }
                </Form.Group>
                <Button variant="primary" onClick={handleSignupSignin} disabled={!emailValidation() || !passwordValidation()}>
                    {
                        formType === 'signin' ? 'Sign In' : 'Sign Up'
                    }
                </Button>
            </Form>
            <strong className='sign-up-in-link'  onClick={toggleFormType}>
                {formType === 'signin' ? 'Not a user click here to Sign-up!': 'Already a user? Click here to Sign-in.'}
            </strong>
            {
                formType === 'signin' && <Link to='/forgotPassword'>Forgot Password?</Link>
            }
        </div>
    )
}

export default Home
