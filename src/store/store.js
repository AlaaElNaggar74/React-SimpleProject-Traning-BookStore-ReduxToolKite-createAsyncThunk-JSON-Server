import { configureStore } from '@reduxjs/toolkit'
import bookSlice from './Slice/bookSlice'
import authSlice from './Slice/authSlice'
export const store = configureStore({
  reducer: {
    books:bookSlice,
    auth:authSlice,
  },
})