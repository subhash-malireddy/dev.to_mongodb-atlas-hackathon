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
    const handleButtonClick = (e) => {
        console.log(e)
        console.log('button clicked')
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
            <Button className="my-btn" onClick={handleButtonClick}>Create A New Task List!</Button>
        </section>
    )
}