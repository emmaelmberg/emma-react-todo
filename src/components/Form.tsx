import { useState } from "react"
import { TaskInterface } from "../interfaces/TaskInterface"

const Form = () => {
    const [formData, setFormData] = useState<TaskInterface>({ title: "", description: "", status: "Ej påbörjad" });

    const submitForm = (async (event: any) => {
        event.preventDefault();

        try {
            const resp = await fetch("http://localhost:5027/api/todo",
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
            if (resp.ok) {
                const data = await resp.json();
                console.log(data);
            } else {
                throw Error;
            }
        } catch (error) {
            console.log(error);
        }
    })

    return (
        <>
            <form onSubmit={submitForm}>
                <label htmlFor="title">Ange titel*</label>
                <input type="text" name="title" id="title" value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} />

                <label htmlFor="description">Beskrivning</label>
                <input type="text" name="description" id="description" value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} />

                <label htmlFor="status">Status</label>
                <select name="status" id="status" value={formData.status} onChange={(event) => setFormData({ ...formData, status: event.target.value })}>
                    <option>Ej påbörjad</option>
                    <option>Påbörjad</option>
                    <option>Avklarad</option>
                </select>

                <input type="submit" value="Lägg till uppgift" />
            </form>
        </>
    )
}

export default Form