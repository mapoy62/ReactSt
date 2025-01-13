import Form from "./components/Form"
import { useReducer, useEffect, useMemo } from "react"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"

function App() {

  /*
  Dispatch: Permite ejecutar las acciones -> Disparar las acciones en el momento que se necesite
  //SUPOSISCIÓN DE UTILIZAR EL REDUCER PARA LLAMAR A UNA API
  */
  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(()=> {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestart = () => useMemo(() => state.activities.length > 0,[state.activities])

  return (
    <>
      <header className="bg-cyan-700 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Calorie Tracker
          </h1>

          <button className="bg-cyan-900 hover:bg-cyan-800 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10" 
            disabled={!canRestart()}
            onClick={()=>dispatch({type: 'restart-app'})}
            >
            Restart App
          </button>
        </div>
      </header>

      <section className="bg-cyan-600 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch = { dispatch }
            state = {state}
          />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker
            activities={state.activities}
          />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList 
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default App
