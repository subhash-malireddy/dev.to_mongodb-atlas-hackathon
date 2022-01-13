import React, { useState, useEffect, useRef } from 'react'
import TaskList from './TaskList';
import '../../styles/home.scss'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import fd2json from '../../utils/fd2json';

import * as Realm from "realm-web";


export default function Tasks() {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)
    const [tasks, setTasks] = useState([])
    const [showModal, setShowModal] = useState(false)
    const createTaskForm = useRef()
    const handleClose = () => setShowModal(false);
    const handleShow = () => { console.log('setting modal show'); setShowModal(true) };


    const app = new Realm.App({ id: "simple-task-reminder-zwzct" })
    const mongodb = app.currentUser.mongoClient('mongodb-atlas')

    const tasksCollection = mongodb.db('simple-task-reminder').collection('tasks')

    const createTask = async (e) => {
        console.log('creating task')
        e.preventDefault()
        const fd = new FormData(createTaskForm.current)
        fd.append("user", app.currentUser.id)
        let task = {}
        for (let key of fd.keys()) {
            task[key] = fd.get(key)
        }
        console.log(task)
        const fdJson = fd2json(fd)
        try {
            const insertResult = await tasksCollection.insertOne(task)
            console.log(insertResult)
            createTaskForm.current.reset()
            setShowModal(false)
        } catch (e) {
            console.warn(e)
            console.log(e)
            alert(String(e))
            createTaskForm.current.reset()
            setShowModal(false)
        }
    }

    const createTaskModal = () => {
        return (
            <Modal show={showModal} onHide={handleClose} backdrop="static" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new task</Modal.Title>
                </Modal.Header>
                <Form ref={createTaskForm} onSubmit={createTask}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Task Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Task title" required name="task_title" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Task description</Form.Label>
                            <Form.Control type="text" placeholder="Describe your task" name="task_description" />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Create Task
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }


    const styles = {
        homeSection: {
            display: "grid",
            justifyContent: "center",
            alignContent: "center",
            minHeight: `${windowHeight - 200}px`
        }
    }

    useEffect(() => {
        console.log(app.currentUser)
        console.log('modal show: ', showModal)
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
            <div className="gap-2 d-md-flex justify-content-md-end" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                <Button variant="success" onClick={handleShow}>Create A New Task</Button>
            </div>
            <div style={styles.homeSection}>
                {!tasks ? <TaskList /> : "There are no tasks to display. Why not create one 😎."}
            </div>
            {
                showModal && createTaskModal()
            }
        </div>
    )
}