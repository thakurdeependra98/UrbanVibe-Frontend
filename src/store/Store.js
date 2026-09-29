import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice'
import productReducer from './reducers/productSlice'
import searchReducer from './reducers/SearchSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    search : searchReducer
  },
})