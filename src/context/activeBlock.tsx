import { useReducer, useContext, createContext } from 'react'
import type { ReactNode, Dispatch } from 'react'
import { SingleBlockPayloadType } from '@/server/routers/blocks'

// Action Defs
const SET = 'activeBlock/SET' // This is a place for enums probably

// Initial State Def
const initialState = {
  data: null,
} //This should either become a blockId or a block Object entirely

type ActiveBlockDataType = SingleBlockPayloadType | null

type ActiveBlockState = {
  data: ActiveBlockDataType
}
type ActiveBlockAction = {
  type: string
  data: ActiveBlockDataType
}
type ActiveBlockProviderProps = {
  children: ReactNode
  initialValue: typeof initialState
}

const reducer = (state: ActiveBlockState, action: ActiveBlockAction) => {
  switch (action.type) {
    case SET:
      return {
        data: action.data,
      }

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
export function setActiveBlock(activeBlock: ActiveBlockDataType) {
  return { type: SET, data: activeBlock }
}
