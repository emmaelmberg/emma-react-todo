import { useState, useEffect } from 'react'
import { TaskInterface } from './interfaces/TaskInterface'
import Task from './components/Task'
import Form from './components/Form'

function App() {
  // State för uppgifter
  const [tasks, setTasks] = useState<[TaskInterface] | []>([]);

  // State för inläsning av uppgifter
  const [loading, setLoading] = useState<boolean>(false);

  // State för felmeddelanden
  const [error, setError] = useState<string | null>(null);

  // Hämta alla tillagda uppgifter
  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      setLoading(true);

      const resp = await fetch("http://localhost:5027/api/todo");
      if (resp.ok) {
        const data = await resp.json();
        setTasks(data);
      } else {
        throw Error("Ett fel uppstod" + resp.status);
      }
    } catch (error) {
      setError("Fel vid inläsning!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main>
        <h1>Att-göra-lista</h1>

        <h2>Lägg till</h2>
        <Form onPost={getItems} />

        <h2>Tillagt</h2>
        {error && <p>{error}</p>}
        {loading && <p>Laddar sidan</p>}

        <div className="section-container">
          {
            tasks.map((task) => (
              <Task taskProp={task} key={task.id} onUpdate={getItems} onDelete={getItems} />
            ))
          }
        </div>
      </main>
    </>
  )
}

export default App
