import SingleTask from "./SingleTask"
export default function TaskList({tasks, deleteTask, completeTask}) {
    return(
        tasks.map((task, index) => {return <SingleTask task={task} key={index} deleteTask={deleteTask} completeTask={completeTask}/>})
    )
}