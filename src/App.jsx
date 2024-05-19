import { useState, useEffect } from 'react'
import './App.css'
import Exercise from './components/exercise'
import axios from 'axios'

function App() {
  
  const [exercises, setExercises] = useState([])


  useEffect(() => {
    axios.get('http://localhost:3002/log')
    .then(response => {
      setExercises(response.data)
    }) 
  }, [])



  return (
    <>
     <h1>welcome to your logbook</h1>
     {exercises.map((e)=> <Exercise name={e.name} entries={e.entries}></Exercise>)}
    </>
  )
}

export default App
