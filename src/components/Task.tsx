import { TaskInterface } from "../interfaces/TaskInterface"

const Task = ({ taskProp, onUpdate, onDelete }: { taskProp: TaskInterface, onUpdate: Function, onDelete: Function }) => {

    const updateStatus = (async (event: any) => {
        let newStatus = event.target.value;

        const updatedTask = { ...taskProp, status: newStatus };

        try {
            const resp = await fetch("http://localhost:5027/api/todo/" + taskProp.id,
                {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(updatedTask)
                });
            if (resp.ok) {
                // Trigga omrendering av att-göra-listan
                onUpdate();
            } else {
                throw Error("Ett fel uppstod" + resp.status);
            }
        } catch (error) {
            console.log(error);
        }
    })

    const deleteTask = (async (event: any) => {
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
                // Trigga omrendering av att-göra-listan
                onDelete();
            } else {
                throw Error("Ett fel uppstod" + resp.status);
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

                <form>
                    <label htmlFor="status" style={{ fontWeight: 700 }}>Ändra status</label>
                    <select name="status" id="status" defaultValue={taskProp.status} onChange={updateStatus}>
                        <option>Ej påbörjad</option>
                        <option>Påbörjad</option>
                        <option>Avklarad</option>
                    </select>
                </form>

                <form onSubmit={deleteTask}>
                    <input type="submit" value="Radera uppgift" className="delete-button" />
                </form>
            </section>
        </>
    )
}

export default Task
