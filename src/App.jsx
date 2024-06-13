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

  const deleteExercise = id => {

      crud.remove(id)

      const updatedExercises = exercises.filter(function(exercise) {
        return (exercise.id !== id)
      })
   
      setExercises(updatedExercises)
  
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
        <>
     {exercises.map((e)=> <><Exercise id={e.id} name={e.name} entries={e.entries}></Exercise>
     <br></br>
     <button onClick={() => deleteExercise(e.id)}>delete exercise</button></>)}
     
     </>
    </>
  )
}

export default App
