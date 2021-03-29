import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import rootReducer, { RootState } from './rootReducer'

export const store = configureStore({
  reducer: rootReducer,
  devTools: true
})

export const AppDispatch = store.dispatch