import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom";
import '../../styles/general.scss'

import * as Realm from "realm-web";


function ForgotPassword() {
    const [email, setEmail] = useState('')
    const app = new Realm.App({ id: "simple-task-reminder-zwzct" })
    let navigate = useNavigate()

    const sendEmail2Realm = async () => {
        try{
            await app.emailPasswordAuth.sendResetPasswordEmail({ email });
            alert("An email is sent with a password reset link. If you cannot find it in your inbox, please check your sapm folder.")
            navigate('/')
        }catch(e){
            alert(String(e))
        }
    }
    return (
        <div className="center-div-vert-flow container">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Please provide your Email address to get a password reset link.</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                </Form.Group>

                <Button variant="primary" onClick={sendEmail2Realm}>
                    Get Password reset link!
                </Button>
            </Form>
        </div>
    )
}

export default ForgotPassword
