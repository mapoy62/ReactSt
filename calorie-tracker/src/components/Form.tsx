import { categories } from "../data/categories"
import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import type { Activity } from "../types"
import { ActivityAction, ActivityState } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityAction>
    state : ActivityState
}

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    description: '',
    calories: 0
}

export default function Form({dispatch, state}: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)
    
    useEffect(() => {
        if(state.activeId){
            const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectedActivity)
        }
    }, [state])

    const handleChange = (event: ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(event.target.id)
        
        setActivity({
            ...activity,
            [event.target.id]: isNumberField ? +event.target.value : event.target.value
        })
    }

    const isValidActivity = () => {
        const { description, calories } = activity
        return description.trim() !== '' && calories > 0
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        dispatch({ type: "save-activity", payload: {newActivity: activity}})
        setActivity({
            ...initialState,
            id: uuidv4()
        })
    } 


  return (
    <form 
        className="space-y-5 bg-white shadow-md rounded-lg p-5"
        onSubmit={handleSubmit}
    >
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Category:</label>
            <select 
                className="border border-slate-300 p-2 rounded-lg w-full bg-white" 
                id="category"
                value={activity.category}
                onChange={handleChange}
                >
                {categories.map((category) => (
                    <option key={category.id} value={category.id}> {category.name}</option>
                ))}
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="description" className="font-bold">Description:</label>
            <input 
                className="border border-slate-300 p-2 rounded-lg w-full bg-white" 
                id="description" 
                placeholder="Ex. Food: Orange Juice, Salad, etc / Exercise: Cycling"
                value={activity.description}
                onChange={handleChange}
                />
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calories:</label>
            <input 
                className="border border-slate-300 p-2 rounded-lg w-full bg-white" 
                type="number" 
                id="calories"
                value={activity.calories}
                onChange={handleChange}
                />
        </div>

        <input type="submit"
        className="bg-cyan-800 hover:bg-cyan-900 w-full p-2 font-bold text-white uppercase rounded-lg cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? 'Add food' : 'Add exercise'}
        disabled={!isValidActivity()}
        />

    </form>

  )
}
