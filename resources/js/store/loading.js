import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Slice
const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    show: false,
    timeout: 0,
  },
  reducers: {
    setLoading(state, action) {
      state.show = action.payload.show
      state.timeout = action.payload.timeout
    },
    setLoadingShow(state, action) {
      state.show = action.payload
      if (action.payload === false) {
        state.timeout = 0
      }
    },
  },
});

// Actions
export const { setLoading, setLoadingShow } = loadingSlice.actions
export default loadingSlice.reducer