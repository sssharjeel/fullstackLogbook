import { useState, useEffect } from 'react'
import './App.css'
import Exercise from './components/exercise'
import axios from 'axios'
import crud from '../crud'

function App() {

  const [exercises, setExercises] = useState([])
  const [exercise, setExercise] = useState('')


  useEffect(() => {

    axios.get('http://localhost:3002/log')
    .then(response => {
      setExercises(response.data)
    }) 
  }, [])

  const handleExercise = (event) => {
    setExercise(event.target.value)

  }


  const addEntry = (event) => {
    event.preventDefault();
    const newExercise = {
        name: exercise,
        entries: []
    }
    const response = crud.create(newExercise)
    setExercises(exercises.concat(response))
    setTimeout(() => {
        setExercise("")
    }, 2000)
}

  return (
    <>
     <h1>welcome to your logbook</h1>
     <form onSubmit={addEntry}>
            <div> <label> exercise: </label>
                <input value={exercise} onChange={handleExercise}></input></div>
            <br></br>
            <button type="submit">add exercise</button>
        </form>
     {exercises.map((e)=> <Exercise name={e.name} entries={e.entries}></Exercise>)}
    </>
  )
}

export default App
