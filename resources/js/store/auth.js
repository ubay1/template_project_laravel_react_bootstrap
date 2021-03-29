import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: true,
    isSignout: false,
    gotek: 'null',
  },
  reducers: {
    RESTORE_TOKEN(state, action) {
      state.tokenWakaf = action.payload.tokenWakaf,
      state.isLoading = false
    },
    SIGN_IN(state, action) {
      state.isSignout = false,
      state.tokenWakaf = action.payload.tokenWakaf
    },
    SIGN_OUT(state, action) {
      state.isSignout = true,
      state.tokenWakaf = 'null'
    },
  },
});

// Actions
export const { RESTORE_TOKEN,SIGN_IN,SIGN_OUT } = authSlice.actions
export default authSlice.reducer