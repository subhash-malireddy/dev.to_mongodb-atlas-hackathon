import React, {useState} from 'react'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useSearchParams, useNavigate } from "react-router-dom";
import '../../styles/general.scss'

import * as Realm from "realm-web";

function ResetPassword() {
    const app = new Realm.App({ id: "simple-task-reminder-zwzct" })
    const [password, setpassword] = useState('')
    let [searchParams, setSearchParams] = useSearchParams()
    let navigate = useNavigate()
    const token = searchParams.get('token')
    const tokenId = searchParams.get('tokenId')

    const sendpassword2Realm = async () => {
        try{
            await app.emailPasswordAuth.resetPassword({ password, token, tokenId });
            alert("Your password has been changed successfully!")
            navigate('/')
        }catch(e){
            alert(String(e))
        }
    }
    return (
        <div className="center-div-vert-flow container">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicpassword">
                    <Form.Label>Please provide your new password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => {setpassword(e.target.value)}}/>
                </Form.Group>

                <Button variant="primary" onClick={sendpassword2Realm}>
                    Reset Password
                </Button>
            </Form>
        </div>
    )
}

export default ResetPassword
