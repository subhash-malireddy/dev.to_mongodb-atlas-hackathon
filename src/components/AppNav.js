import React, { useEffect, useState } from 'react'
import { Container, Nav, Button } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import { useNavigate } from 'react-router-dom';

import * as Realm from "realm-web";

import '../styles/general.scss'

function AppNav() {
    const app = new Realm.App({ id: process.env.REACT_APP_REALM_APP_ID })
    const [currentUser, setCurrentUser] = useState(app.currentUser)
    let navigate = useNavigate()
    const logout = async () => {
        await app.currentUser.logOut()
        setCurrentUser(app.currentUser)
        navigate('/')
    }
    useEffect(() => {
        if(currentUser){
            navigate('/tasks')
        }
    },[currentUser, navigate])
    return (
        <div>
            <Navbar bg="dark" className="nav-brand">
                <Container>
                    <Navbar.Brand>Simple Task Remainder</Navbar.Brand>
                </Container>
                {
                    app.currentUser &&
                    <Nav style={{ marginRight: "1rem" }}>
                        <Button variant="danger" onClick={logout}>Logout</Button>
                    </Nav>
                }
            </Navbar>
        </div>
    )
}

export default AppNav
