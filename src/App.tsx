import './App.css'
import { useState, useEffect } from 'react'
import { TaskInterface } from './interfaces/TaskInterface'
import Task from './components/Task';
import Form from './components/Form';

function App() {
  // State för uppgifter
  const [tasks, setTasks] = useState<[TaskInterface] | []>([]);

  // Hämta alla tillagda uppgifter
  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const resp = await fetch("http://localhost:5027/api/todo");
      if (resp.ok) {
        const data = await resp.json();
        setTasks(data);
      } else {
        throw Error;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <main>
        <h1>Att-göra-lista</h1>

        <h2>Lägg till</h2>
        <Form />

        <h2>Tillagt</h2>
        <div className="section-container">
          {
            tasks.map((task) => (
              <Task taskProp={task} key={task.id} />
            ))
          }
        </div>
      </main>
    </>
  )
}

export default App
