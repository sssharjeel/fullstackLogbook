import { useState } from "react"
import crud from "../../crud"

const Exercise = ({name, entries}) => {

    const [open, setOpen] = useState(false)
    const [newWorkouts, setNewWorkouts] = useState(entries)
    const [newWeight, setNewWeight] = useState('')
    const [newReps, setNewReps] = useState('')


    const TableRow = ({date, weight, reps}) => {
        return (
            <tr>
                <th scope="row">{date}</th>
                <td>{weight}</td>
                <td>{reps}</td>
            </tr>
        )
    }

    const TableContent = ({entries}) => {
        return (entries.map((e) => <TableRow date={e.date} weight={e.weight} reps={e.reps} ></TableRow>))
    }


    const Content = () => {
        if (open) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Weight</th>
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

    const handleReps = (event) => {
        event.preventDefault()
        setNewReps(event.target.value)
    }


    return (
        <>
        <h2>{name}</h2>
        <form onSubmit={addEntry}>
            <div> <label> weight: </label>
                <input value={newWeight} onChange={handleWeight}></input></div>
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