import { useReducer, useContext, createContext } from 'react'

// Action Defs
const SET = 'activeBlock/SET'

const initialState = {
  data: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET:
      return {
        ...state,
        // eslint-disable-next-line no-sequences
        data: action.activeBlock,
      }

    default:
      throw Error(`Unknown action: ${action.type}`)
  }
}

const ActiveBlockStateContext = createContext()
const ActiveBlockDispatchContext = createContext()

export const ActiveBlockProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <ActiveBlockDispatchContext.Provider value={dispatch}>
      <ActiveBlockStateContext.Provider value={state}>
        {children}
      </ActiveBlockStateContext.Provider>
    </ActiveBlockDispatchContext.Provider>
  )
}

export const useActiveBlockState = () => useContext(ActiveBlockStateContext)
export const useActiveBlockDispatch = () =>
  useContext(ActiveBlockDispatchContext)

// Actions
export function setActiveBlock(activeBlock) {
  return { type: SET, activeBlock }
}
