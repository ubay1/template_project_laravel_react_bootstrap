import { combineReducers } from '@reduxjs/toolkit'
import UserReducer from './user';
// import LoadingReducer from "./loading";
// import NavigationReduxReducer from './navigation_redux'
import AuthReducer from './auth'


const rootReducer = combineReducers({
  user: UserReducer,
  auth: AuthReducer
})
export const RootState = rootReducer
export default rootReducer