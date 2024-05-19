import { useState } from 'react'
import './App.css'
import Exercise from './components/exercise'
import axios from 'axios'

function App() {

  const log = [
    {
      name: "bench press",
      entries: []
    }, 
    {
      name: "chest supported t-bar row",  
      entries: []
    },
    {
      name: "overhead press",
      entries: []
    }
  ]

  useEffect(() => {
    axios.get('http://localhost:3002/log')
    .then(response => {
      setExercises(response.data)
    })
  }, [])

  const [exercises, setExercises] = useState(log)

  return (
    <>
     <h1>welcome to your logbook</h1>
     {exercises.map((e)=> <Exercise name={e.name} entries={e.entries}></Exercise>)}
    </>
  )
}

export default App
