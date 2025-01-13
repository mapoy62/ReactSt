import { useMemo } from "react"
import { Activity } from "../types"
import CaloriesDisplay from "./CaloriesDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}

export default function CalorieTracker({activities}: CalorieTrackerProps) {
    //Contadores
    const caloriesConsumed = useMemo(() =>activities.reduce((total, activity) => 
    activity.category === 1 ? total + activity.calories : total, 0) , [activities])

    const caloriesBurned = useMemo(() =>activities.reduce((total, activity) => 
        activity.category === 2 ? total + activity.calories : total, 0) , [activities])

    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities])

    return (
    <>
        <h2 className="text-4xl font-black text-white text-center">Calorie Summary</h2>

        <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
            <CaloriesDisplay 
                calories={caloriesConsumed}
                text="Consumed"
                color="text-orange-300"
            />
            <CaloriesDisplay 
                calories={caloriesBurned}
                text="Burned"
                color="text-lime-300"
            />
            <CaloriesDisplay 
                calories={netCalories}
                text="Difference"
                color="text-white"
            />
        </div>

    </>
    )
}
