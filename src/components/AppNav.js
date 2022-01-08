import React from 'react'
import { Container } from 'react-bootstrap'

import Navbar from 'react-bootstrap/Navbar'
import '../styles/general.scss'

function AppNav() {
    return (
        <div>
            <Navbar bg="dark" className="nav-brand">
                <Container>
                    <Navbar.Brand>Simple Task Remainder</Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    )
}

export default AppNav
