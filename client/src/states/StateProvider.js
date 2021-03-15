//setup data layer

import React, {createContext,useContext,useReducer} from 'react'

//this data layer
export const StateContext = createContext();

//provider for warp all componnets

export const StateProvider = ({reducer,initialState,children}) =>(
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext);