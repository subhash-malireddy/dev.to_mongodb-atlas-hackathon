import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { InfoCircle } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';

import * as Realm from "realm-web";

import '../../styles/home.scss'

function Home() {

    const app = new Realm.App({ id: process.env.REACT_APP_REALM_APP_ID })

    const [windowHeight, setWindowHeight] = useState(window.innerHeight)
    const [formType, setFormType] = useState('signin')

    const [email, setEmail] = useState('')
    const [emailTouched, setEmailTouched] = useState(false)
    const [passwordTouched, setPasswordTouched] = useState(false)
    const [password, setPassword] = useState('')

    //user acknowledgement model
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [userAcknowledgement, setuserAcknowledgement] = useState(false)

    let navigate = useNavigate()

    const handleWindowResize = () => {
        setWindowHeight(window.innerHeight)
    }

    const styles = {
        homeSection: {
            display: "grid",
            justifyContent: "center",
            alignContent: "center",
            minHeight: `${windowHeight}px`
        }
    }
    const toggleFormType = (e) => {
        if (formType === 'signin') {
            setEmail('')
            setPassword('')
            setFormType('signup')
        }
        else {
            setEmail('')
            setPassword('')
            setFormType('signin')
        }
    }

    const handleSignupSignin = async () => {
        if (formType === 'signin') {
            console.log('signing in')
            console.log(`email: ${email}, password: ${password}`)
            const credentials = Realm.Credentials.emailPassword(email, password)
            try {
                const user = await app.logIn(credentials);
                console.log(user)
                navigate('/tasks')
            } catch (e) {
                const errorStr = String(e)
                if(errorStr.includes('confirm')){
                    alert('Please confirm your email to login')
                }else{
                    alert(errorStr)
                }
            }
        } else {
            console.log('signing up')
            console.log(`email: ${email}, password: ${password}`)
            try {
                await app.emailPasswordAuth.registerUser({ email, password })
                handleShow()
                setFormType("signin")
            } catch (e) {
                alert(String(e))
            }
        }
    }

    const emailValidation = () => {
        if (/\S+@\S+\.\S+/.test(email)) {
            return true;
        }
        else if (email.trim() === '') {
            return false;
        }
        else {
            return false;
        }

    };

    const passwordValidation = () => {
        if (password.length >= 8) {
            return true;
        }
        else if (password.length === 0) {
            return false;
        }
        else {
            return false;
        }
    };


    useEffect(() => {

        setWindowHeight(window.innerHeight)
        window.addEventListener('resize', handleWindowResize)

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    return (
        <div style={styles.homeSection}>
            <p style={{backgroundColor: 'yellow', display: userAcknowledgement? "block": "none"}}>
            {/* <img src="../../assets/images/icons/info-circle.svg" alt="Bootstrap" width="32" height="32" /> */}
            <InfoCircle height="32" width="32"/>
                {/* <i className="bi bi-info-circle"></i>*/}
                &nbsp; You must confirm your email to login. 
                </p>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value); }} onClick={() => { setEmailTouched(true) }} />
                    {emailTouched && !emailValidation() && <span className="form-valiation-msg">**Please enter a valid email address**</span>}
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value); }} onClick={() => { setPasswordTouched(true) }} />
                    {passwordTouched && !passwordValidation() && <span className="form-valiation-msg">**Make sure password is 8 characters long**</span>}
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
            <strong className='sign-up-in-link' onClick={toggleFormType}>
                {formType === 'signin' ? 'Not a user click here to Sign-up!' : 'Already a user? Click here to Sign-in.'}
            </strong>
            {
                formType === 'signin' && <Link to='/forgotPassword'>Forgot Password?</Link>
            }

            {/* Info modal that cofirms the user understands that he/she must confirm the email address inorder to login. */}
            <Modal
                show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h4>Welcome {`${email.substring(0, email.lastIndexOf("@"))}`}</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 style={{color: 'red', textAlign: 'center'}}><em>**Important! Please read carefully.**</em></h6>
                    <p>
                        Your user account is created. <br /><br /> 
                        Finish the setup by confirming your email. <br /> <br />
                        Check your email for your cinfirmation link. If you cannot find it please check your email's spam folder. 
                    </p>
                    <input type="checkbox" checked={userAcknowledgement} onChange={(e)=>{setuserAcknowledgement(e.target.checked)}}/>
                    <span> &nbsp;<strong>I understand that I need to confirm my email to login and use the app.</strong></span>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} disabled={!userAcknowledgement} >Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Home
