import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import linkReducer from './slices/linkSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    links: linkReducer,
  },
})

export default store
