import React, { useState, useEffect } from 'react'

import '../../styles/home.scss'
import Button from 'react-bootstrap/Button'

export default function Home() {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)

    const styles = {
        homeSection: {
            display: "grid",
            justifyContent: "center",
            alignContent: "center",
            minHeight: `${windowHeight}px`
        }
    }

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
        <section style={styles.homeSection}>
            <Button style={styles.btn}>Create A New Task List!</Button>
        </section>
    )
}