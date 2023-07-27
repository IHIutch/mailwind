import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react'

// Action Defs
const SET = 'selectedBlock/SET' // This is a place for enums probably

// Initial State Def
const initialState = {
  data: null,
} //This should either become a blockId or a block Object entirely

type SelectedBlockDataType = number | null

type SelectedBlockState = {
  data: SelectedBlockDataType
}
type SelectedBlockAction = {
  type: string
  data: SelectedBlockDataType
}
type SelectedBlockProviderProps = {
  children: ReactNode
  initialValue?: typeof initialState
}

const reducer = (state: SelectedBlockState, action: SelectedBlockAction) => {
  switch (action.type) {
    case SET:
      return {
        data: action.data,
      }

    default:
      throw Error(`Unknown action: ${action.type}`)
  }
}

const SelectedBlockStateContext =
  createContext<SelectedBlockState>(initialState)
const SelectedBlockDispatchContext = createContext<
  Dispatch<SelectedBlockAction>
>(() => null)

export const SelectedBlockProvider = ({
  children,
  initialValue = initialState,
}: SelectedBlockProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialValue)
  return (
    <SelectedBlockDispatchContext.Provider value={dispatch}>
      <SelectedBlockStateContext.Provider value={state}>
        {children}
      </SelectedBlockStateContext.Provider>
    </SelectedBlockDispatchContext.Provider>
  )
}

export const useSelectedBlockState = () => useContext(SelectedBlockStateContext)
export const useSelectedBlockDispatch = () =>
  useContext(SelectedBlockDispatchContext)

// Actions
export function setSelectedBlock(activeBlock: SelectedBlockDataType) {
  return { type: SET, data: activeBlock }
}
