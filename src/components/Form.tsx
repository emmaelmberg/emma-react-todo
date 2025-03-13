function Form() {
    return (
        <>
            <form>
                <label htmlFor="title">Ange titel*</label>
                <input type="text" name="title" id="title" />

                <label htmlFor="description">Beskrivning</label>
                <input type="text" name="description" id="description" />

                <label htmlFor="status">Status</label>
                <select name="status" id="status">
                    <option>Ej påbörjad</option>
                    <option>Påbörjad</option>
                    <option>Avklarad</option>
                </select>

                <button type="submit">Lägg till</button>
            </form>
        </>
    )
}

export default Form