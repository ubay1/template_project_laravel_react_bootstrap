import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    tuya_user_id: '',
    loginWith: '',
    profile: {
      email: '',
      address: '',
      phone_number: '',
      name: '',
      foto: '',
    }
  },
  reducers: {
    setUsersProfile(state, action) {
      state.profile.address = action.payload.address
      state.profile.email = action.payload.email
      state.profile.name = action.payload.name
      state.profile.phone_number = action.payload.phone_number
      state.profile.foto = action.payload.foto
    },
    setAuth(state, action) {
      // state.gotek = action.payload.gotek
      state.tuya_user_id = action.payload.tuya_user_id
      state.loginWith = action.payload.loginWith
    },
  },
});

// Actions
export const { setUsersProfile, setAuth } = userSlice.actions
export default userSlice.reducer