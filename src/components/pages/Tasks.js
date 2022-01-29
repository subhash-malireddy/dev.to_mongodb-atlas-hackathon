import React, { useState, useEffect, useRef} from 'react'
import TaskList from '../TaskList';
import '../../styles/home.scss'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'


import * as Realm from "realm-web";


export default function Tasks() {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)

    const [tasks, setTasks] = useState([])
    const [showModal, setShowModal] = useState(false)
    const createTaskForm = useRef()
    const handleClose = () => setShowModal(false);
    const handleShow = () => { setShowModal(true) };

    const [taskRelatedUpdate, setTaskRelatedUpdate] = useState("") //this tells what kind of update happended to component that is related to tasks. completed, deleted, created, or getTasks

    const app = new Realm.App({ id: process.env.REACT_APP_REALM_APP_ID })
    const mongodb = app.currentUser.mongoClient('mongodb-atlas')

    const tasksCollection = useRef(mongodb.db('simple-task-reminder').collection('tasks'))

    //tasks crud
    const createTask = async (e) => {
        e.preventDefault()
        const fd = new FormData(createTaskForm.current)
        fd.append("user", app.currentUser.id)
        fd.append("user_email", app.currentUser.profile.email)
        let newTask = {}
        for (let key of fd.keys()) {
            newTask[key] = fd.get(key)
        }
        newTask["date_created"] = new Date()
        newTask["task_status"] = "incomplete"
        // console.log(newTask)
        try {
            const insertResult = await tasksCollection.current.insertOne(newTask)
            newTask["_id"] = insertResult.insertedId 
            tasks.push(newTask)
            createTaskForm.current.reset()
            setShowModal(false)
        } catch (e) {
            console.warn(e)
            // console.log(e)
            alert(String(e))
            createTaskForm.current.reset()
            setShowModal(false)
        }
    }

    const handleSetWindowHeight = () => {
        console.log('setting window height')
        setWindowHeight(window.innerHeight)
    }

    const completeTask = async (_id) => {
        /* 
        you can modify the local tasks array to reflect the changes and choose not to send another request to db. 
        But for simplicity I'll call the getAllTasks to rereender the component with new set of tasks.
        In this function I'll send an update request and once the task is updated, I'll send a get request to get a new set of updated tasks from db.
         */
        // console.log("task_id: ", _id)
        try {
            const updateResult = await tasksCollection.current.updateOne(
                { _id: _id },
                { $set: { task_status: "complete" } }
            )
            if (updateResult.matchedCount === 1 && updateResult.modifiedCount === 1) {
                alert("Yay! Keep up the good Work, you completed your task.")
            } else {
                alert("There's a problem updating the task, please try again. Make sure you are logged in!")
            }
            setTaskRelatedUpdate("completed")
        } catch (e) {
            alert(String(e))
        }
    }
    const deleteTask = async (_id) => {
        /* 
       you can modify the local tasks array to reflect the changes and choose not to send another request to db. But for simplicity I'll call the getAllTasks to rereender the component with new set of tasks.
       In this function I'll send an delete request and once the task is deleted, I'll send a get request to get a new set of updated tasks from db.
        */
        if(window.confirm("Are you sure you want to delete this task?")){
            try {
                const deleteResult = await tasksCollection.current.deleteOne(
                    { _id: _id }
                )
                if (deleteResult.deletedCount === 1) {
                    setTaskRelatedUpdate("deleted")
                    alert("Task deleted Successfully")
                } else {
                    alert("There's a problem deleting the task, please try again. Make sure you are logged in!")
                }
            } catch (e) {
                alert(e)
            }
        }else{
            alert('You cancelled deleting the task')
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
        console.log('useEffect running')
        const getAllTasks = async () => {
                if(taskRelatedUpdate !== "getTasks"){
                    try{
                        setTasks(await tasksCollection.current.find({ task_status: "incomplete" }))
                        setTaskRelatedUpdate("getTasks")
                    }catch(e){
                        console.warn(e)
                    }
                }
            }
            getAllTasks()
            window.addEventListener('resize', handleSetWindowHeight)
        return () => {
            window.removeEventListener('resize', handleSetWindowHeight)
            console.log('event removed')
        }
    }, [taskRelatedUpdate])

    return (
        <div className="container">
            <div className="gap-2 d-md-flex justify-content-md-end" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                <Button variant="success" onClick={handleShow}>Create A New Task</Button>
            </div>
            <div style={styles.homeSection}>
                {tasks.length !== 0 ? <TaskList tasks={tasks} deleteTask={deleteTask} completeTask={completeTask} /> : "There are no tasks to display. Why not create one 😎."}
            </div>
            {
                showModal && createTaskModal()
            }
        </div>
    )
}