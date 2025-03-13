import { TaskInterface } from "../interfaces/TaskInterface"

const Task = ({ taskProp } : { taskProp: TaskInterface }) => {
    return (
        <>
        
            <section>
                <h3>Uppgift #{taskProp.id}</h3>
                <p>{taskProp.title}</p>

                <h3>Beskrivning</h3>
                <p>{taskProp.description}</p>

                <h3>Status</h3>
                <p>{taskProp.status}</p>

                <p>Redigera status</p>
                <p>Markera som avklarad</p>
            </section>
        </>
    )
}

export default Task
