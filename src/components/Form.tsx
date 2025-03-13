import { useState } from "react"
import { TaskInterface } from "../interfaces/TaskInterface"
import { ErrorInterface } from "../interfaces/ErrorInterface"

const Form = ({ onPost }: { onPost: Function }) => {
    // State för formulär
    const [formData, setFormData] = useState<TaskInterface>({ title: "", description: "", status: "Ej påbörjad" });

    // State för felmeddelanden
    const [error, setError] = useState<ErrorInterface>({});

    const validateForm = ((data: TaskInterface) => {
        const validationError: ErrorInterface = {};

        if (!data.title || data.title.length <= 2) {
            validationError.title = "Skriv en titel på minst 3 tecken";
        }

        if (data.description.length >= 200) {
            validationError.description = "Ange högst 200 tecken i beskrivning";
        }

        return validationError;
    })

    // Validera formulär
    const submitForm = (async (event: any) => {
        event.preventDefault();

        const validationError = validateForm(formData);

        if (Object.keys(validationError).length > 0) {
            setError(validationError);
        } else {
            setError({});

            try {
                const resp = await fetch("http://localhost:5027/api/todo",
                    {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify(formData)
                    });
                if (resp.ok) {
                    const data = await resp.json();
                    console.log(data);

                    // Rensa formulär efter POST
                    formData.title = "";
                    formData.description = "";

                    // Trigga omrendering av att-göra-listan
                    onPost();
                } else {
                    throw Error("Ett fel uppstod" + resp.status);
                }
            } catch (error) {
                console.log(error);
            }
        }
    })

    return (
        <>
            <form onSubmit={submitForm}>

                <label htmlFor="title">Ange titel (obligatorisk)</label>
                {error.title && <span className="error-message">{error.title}</span>}
                <input type="text" name="title" id="title" value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} />

                <label htmlFor="description">Beskrivning</label>
                {error.description && <span className="error-message">{error.description}</span>}
                <textarea name="description" id="description" value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} />

                <label htmlFor="status">Status</label>
                <select name="status" id="status" defaultValue={formData.status} >
                    <option>Ej påbörjad</option>
                </select>

                <input type="submit" value="Lägg till uppgift" />
            </form>
        </>
    )
}

export default Form