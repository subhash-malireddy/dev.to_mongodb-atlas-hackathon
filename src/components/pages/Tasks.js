import React, { useState, useEffect } from 'react'
import TaskList from './TaskList';
import '../../styles/home.scss'
import Button from 'react-bootstrap/Button'

import * as Realm from "realm-web";


export default function Tasks() {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)
    const [tasks, setTasks] = useState([])

    
    const app = new Realm.App({ id: "simple-task-reminder-zwzct" })
    const mongodb = app.currentUser.mongoClient('mongodb-atlas')
    
    const tasksCollection = mongodb.db('simple-task-reminder').collection('tasks')
    
    const simpleTask = {
        task_title: "My first task",
        task_description: "This is a test task to see if I can post to db using realm app.",
        // user: app.currentUser.id
    }
    const createTask = async() => {
        try{
            const insertResult = await tasksCollection.insertOne(simpleTask)
            console.log(insertResult)
        }catch(e){
            console.warn(e)
            console.log(String(e))
            console.log(e)
        }
    }

    const styles = {
        homeSection: {
            display: "grid",
            justifyContent: "center",
            alignContent: "center",
            minHeight: `${windowHeight - 200}px`
        }
    }
    const handleButtonClick = (e) => {
        console.log(e)
        console.log('button clicked')
    }

    useEffect(() => {
        console.log(app.currentUser)
        setWindowHeight(window.innerHeight)
        window.addEventListener('resize', () => {
            setWindowHeight(window.innerHeight)
        })

        return () => {
            window.removeEventListener('resize', setWindowHeight)
        }
    }, [])

    return (
        // <section style={styles.homeSection}>
        //     <Button className="my-btn" onClick={handleButtonClick}>Create A New Task List!</Button>
        // </section>
        <div className="container">
            <div className="gap-2 d-md-flex justify-content-md-end" style={{marginTop: "1rem", marginBottom: "1rem"}}>
                <Button variant="success" onClick = {createTask}>Create A New Task</Button>
            </div>
            <div style = {styles.homeSection}>
                {!tasks ? <TaskList /> : "There are no tasks to display. Why not create one 😎."}
            </div>
        </div>
    )
}