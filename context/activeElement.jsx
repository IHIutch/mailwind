import { useReducer, useContext, createContext } from 'react'

// Action Defs
const SET = 'activeElement/SET'

const initialState = {
  data: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET:
      return {
        ...state,
        // eslint-disable-next-line no-sequences
        data: action.activeElement,
      }

    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

const ActiveElementStateContext = createContext()
const ActiveElementDispatchContext = createContext()

export const ActiveElementProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <ActiveElementDispatchContext.Provider value={dispatch}>
      <ActiveElementStateContext.Provider value={state}>
        {children}
      </ActiveElementStateContext.Provider>
    </ActiveElementDispatchContext.Provider>
  )
}

export const useActiveElementState = () => useContext(ActiveElementStateContext)
export const useActiveElementDispatch = () =>
  useContext(ActiveElementDispatchContext)

// Actions
export function setActiveElement(activeElement) {
  return { type: SET, activeElement }
}
