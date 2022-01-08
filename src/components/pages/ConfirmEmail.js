import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom";
import * as Realm from "realm-web";

function ConfirmEmail() {

    const app = new Realm.App({ id: "simple-task-reminder-zwzct" })
    const userConfiramtionStatus = useState(false)
    let [searchParams, setSearchParams] = useSearchParams()
    let navigate = useNavigate()
    const token = searchParams.get('token')
    const tokenId = searchParams.get('tokenId')

    const confirmUser = async () => {
        try{
            await app.emailPasswordAuth.confirmUser({ token, tokenId });
            navigate('/')
        }catch(e){
            alert(String(e))
        }

    }

    useEffect(() => {
        confirmUser()
    }, [])

    return (
        <div style={{textAlign: 'center'}}>
            {userConfiramtionStatus && 'confirming your email'}
        </div>
    )
}

export default ConfirmEmail
