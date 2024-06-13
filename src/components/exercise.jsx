import { useState } from "react"
import crud from "../../crud"

const Exercise = ({id, name, entries}) => {

    const [open, setOpen] = useState(false)
    const [newWorkouts, setNewWorkouts] = useState(entries)
    const [newWeight, setNewWeight] = useState('')
    const [newReps, setNewReps] = useState('')
    const [newSets, setNewSets] = useState('')

    const handleEntryDelete = ({index}) => {
        crud.removeE(id, index)

        const updatedEntries = newWorkouts.filter(function(entry) {
        return (entry.index !== index)
      })
   
      setNewWorkouts(updatedEntries)
      
    }

    const TableRow = ({index, date, weight, sets, reps}) => {
        return (
            <tr>
                <th scope="row">{date}</th>
                <td>{weight}</td>
                <td>{sets}</td>
                <td>{reps}</td>
                <td><button onClick={() => handleEntryDelete(index)}>x</button></td>
            </tr>
        )
    }

    const TableContent = ({entries}) => {
        return (entries.map((e) => <TableRow index={e.index} date={e.date} weight={e.weight} sets={e.sets} reps={e.reps} ></TableRow>))
    }


    const Content = () => {
        if (open) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Sets</th>
                            <th scope="col">Repetitions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableContent entries={newWorkouts}> </TableContent>
                    </tbody>
                    </table>
               )
        } else  {
            return <></>
        }
    }

    const ExpandButton = () => {
        if (open) {
            return <button onClick={() => setOpen(!open)}>collapse</button>
        } else {
            return <button onClick={() => setOpen(!open)}>expand</button>
        }
    }

    const handleWeight = (event) => {
        event.preventDefault()
        setNewWeight(event.target.value)
    }

    const handleSets = (event) => {
        event.preventDefault()
        setNewSets(event.target.value)
    }

    const handleReps = (event) => {
        event.preventDefault()
        setNewReps(event.target.value)
    }

    const addEntry = (event) => {
        event.preventDefault()
        const newEntry = {
            weight: newWeight,
            sets: newSets,
            reps: newReps
        }
        const response =  crud.addE(id, newEntry)
        const newW = newWorkouts.concat(response)
        setNewWorkouts(newW)
        setTimeout(() => {
            setNewWeight('')
            setNewSets('')
            setNewReps('')
        }, 2000)
      }


    return (
        <>
        <h2>{name}</h2>
        <form onSubmit={addEntry}>
            <div> <label> weight: </label>
                <input value={newWeight} onChange={handleWeight}></input></div>
            <br></br>
            <div><label> sets: </label> <input value={newSets} onChange={handleSets}></input></div>
            <br></br>
            <div><label> reps: </label> <input value={newReps} onChange={handleReps}></input></div>
            <br></br>
            <button type="submit">add entry</button>
        </form>
        <br></br>
        <ExpandButton></ExpandButton>
        <br></br>
        <Content></Content>
        </>
    )
}

export default Exercise