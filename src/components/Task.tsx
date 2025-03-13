import { TaskInterface } from "../interfaces/TaskInterface"

const Task = ({ taskProp, onDelete }: { taskProp: TaskInterface, onDelete: Function }) => {

    const deleteTask = (async (event : any) => {
        event.preventDefault();

        try {
            const resp = await fetch("http://localhost:5027/api/todo/" + taskProp.id,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json'
                    }
                });
            if (resp.ok) {
                onDelete();
            } else {
                throw Error;
            }
        } catch (error) {
            console.log(error);
        }
    })

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

                <form onSubmit={deleteTask}>
                    <input type="submit" value="Radera uppgift" />
                </form>
            </section>
        </>
    )
}

export default Task
