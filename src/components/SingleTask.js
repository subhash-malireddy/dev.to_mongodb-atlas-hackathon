import React from 'react'
import { Card, Button } from 'react-bootstrap'

function SingleTask({task, deleteTask, completeTask}) {
    return (
        <Card className="task">
            <Card.Header>
                <Card.Title>{task.task_title}</Card.Title>
                <hr />
                <Card.Subtitle>{String(task.date_created)}</Card.Subtitle>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {
                        task.task_description ? task.task_description : "No descrition for this task" 
                    }
                    {
                        
                        `\n STATUS: ${task.task_status}`
                    }
                </Card.Text>
            </Card.Body>
            <Card.Footer className="task-card-footer">
                    <Button variant="danger" onClick={()=>{deleteTask(task._id)}}>Delete Task</Button>
                    <Button variant="success" onClick={()=>{completeTask(task._id)}}>Complete Task</Button>
                </Card.Footer>
        </Card>
    )
}

export default SingleTask
