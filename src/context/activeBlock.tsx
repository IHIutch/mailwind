import { useReducer, useContext, createContext } from 'react'
import type { ReactNode, Dispatch } from 'react'

// Action Defs
const SET = 'activeBlock/SET' // This is a place for enums probably

// Initial State Def
const initialState = null //This should either become a blockId or a block Object entirely

type ActiveBlockState = object | null
type ActiveBlockAction = {
  type: string
  data: ActiveBlockState
}
type ActiveBlockProviderProps = {
  children: ReactNode
  initialValue?: typeof initialState
}

const reducer = (state: ActiveBlockState, action: ActiveBlockAction) => {
  switch (action.type) {
    case SET:
      return action.data

    default:
      throw Error(`Unknown action: ${action.type}`)
  }
}

const ActiveBlockStateContext = createContext<ActiveBlockState>(initialState)
const ActiveBlockDispatchContext = createContext<Dispatch<ActiveBlockAction>>(
  () => null
)

export const ActiveBlockProvider = ({
  children,
  initialValue = initialState,
}: ActiveBlockProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialValue)
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
export function setActiveBlock(activeBlock: ActiveBlockState) {
  return { type: SET, data: activeBlock }
}
