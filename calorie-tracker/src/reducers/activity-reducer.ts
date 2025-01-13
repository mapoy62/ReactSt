import { Activity } from "../types"

export type ActivityAction = 
    //Psamos lo que el usuario ingresó de info, a través del payload -> Datos que se agregan al state
    {type: 'save-activity', payload: { newActivity: Activity} } |
    {type: 'set-activeId', payload: {id: Activity['id']} } |
    {type: 'delete-activity', payload: {id: Activity['id']} } |
    {type: 'restart-app' }



export type ActivityState = {
    activities: Activity[]
    activeId: Activity['id']
}

//Necesitamos un state initial de localStorage para que verifique si tiene algo entonces este será su valor inicial
const localStorageActivities = (): Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityAction
) => {
    if(action.type === 'save-activity') {   
        //Maneja la lógica para actualizar el state
        //Payload: Son los datos que le pasas junto a la acción y la forma en la que que lo recuperas es con action
        //console.log(action.payload.newActivity) 

        let updatedActivities : Activity[] = []
        if(state.activeId){
            updatedActivities=[...state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)]
        }else{
            updatedActivities = [...state.activities, action.payload.newActivity]
        }

        return {
            ...state,
            //Se recomienda siempre hacer una copia auqnue solo tengamos un elemento, porque así evitamos volver a todas las acciones
            //activities: [...state.activities, action.payload.newActivity]
            activities: updatedActivities,
            activeId: ''
        }
    }

    if(action.type === 'set-activeId'){
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === 'delete-activity'){
        return {
            ...state,
            activities: state.activities.filter(activity => activity.id === action.payload.id)
        }
    }

    if(action.type === 'restart-app'){
        return{
            activities: [],
            activeId: ''
        }
    }

    return state
}